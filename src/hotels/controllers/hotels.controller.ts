import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AmadeusService } from '../../amadeus/services/amadeus.service';
import { ApiKeyGuard } from '../../guards/api-key.guard';
import { HotelsAdapter } from '../../utils/hotels.util';
import { GetHotelAvailabilityDto } from '../dto/getHotels.dto';
import {
  excelColumnConfig,
  HotelSearchResponse,
} from '../../interfaces/hotelOffer.interface';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HotelSearchResponseDto } from '../dto/hotelsSearchResponse.dto';

@ApiTags('hotels')
@Controller('hotels')
@UseGuards(ApiKeyGuard)
export class HotelsController {
  constructor(private readonly amadeusService: AmadeusService) {}

  @Get('availability')
  @ApiOperation({ summary: 'Retrieve hotel availability by city' })
  @ApiQuery({ name: 'cityCode', type: String, description: 'City code (IATA)' })
  @ApiQuery({
    name: 'checkInDate',
    type: String,
    description: 'Check-in date (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'checkOutDate',
    type: String,
    description: 'Check-out date (YYYY-MM-DD)',
  })
  @ApiQuery({ name: 'guests', type: Number, description: 'Number of guests' })
  @ApiHeader({
    name: 'api-key',
    description: 'API Key for authentication',
    required: true,
  })
  @ApiQuery({
    name: 'roomQuantity',
    type: Number,
    description: 'Number of rooms required',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful response with hotel availability data',
    type: HotelSearchResponseDto,
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getHotelAvailability(
    @Query() query: GetHotelAvailabilityDto,
  ): Promise<HotelSearchResponse> {
    const { cityCode, checkInDate, checkOutDate, guests, roomQuantity } = query;

    try {
      const response = await this.amadeusService.searchHotels(
        cityCode,
        checkInDate,
        checkOutDate,
        guests,
        roomQuantity,
      );

      return HotelsAdapter(response, cityCode, checkInDate, checkOutDate);
    } catch (error) {
      throw new HttpException(
        error.response?.[0]?.title ||
          error.message ||
          'Error retrieving hotel availability',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('availability/excel')
  @ApiOperation({ summary: 'Export hotel availability to Excel' })
  @ApiQuery({ name: 'cityCode', type: String, description: 'City code (IATA)' })
  @ApiQuery({
    name: 'checkInDate',
    type: String,
    description: 'Check-in date (YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'checkOutDate',
    type: String,
    description: 'Check-out date (YYYY-MM-DD)',
  })
  @ApiQuery({ name: 'guests', type: Number, description: 'Number of guests' })
  @ApiQuery({
    name: 'roomQuantity',
    type: Number,
    description: 'Number of rooms required',
  })
  @ApiHeader({
    name: 'api-key',
    description: 'API Key for authentication',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Excel file with hotel availability data',
    content: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {},
    },
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getHotelAvailabilityExcel(
    @Query() query: GetHotelAvailabilityDto,
    @Res() res: Response,
  ) {
    const { cityCode, checkInDate, checkOutDate, guests, roomQuantity } = query;

    try {
      const response = await this.amadeusService.searchHotels(
        cityCode,
        checkInDate,
        checkOutDate,
        guests,
        roomQuantity,
      );

      const hotelsData: HotelSearchResponse = HotelsAdapter(
        response,
        cityCode,
        checkInDate,
        checkOutDate,
      );

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Hotel Availability');

      worksheet.columns = excelColumnConfig.map((col) => ({
        header: col.header,
        key: col.key,
        width: col.width,
      }));

      hotelsData.hotels.forEach((hotel) => {
        worksheet.addRow({
          name: hotel.name,
          rating: hotel.rating,
          address: hotel.address,
          currency: hotel.price.currency,
          amount: hotel.price.amount,
          roomsAvailable: hotel.roomsAvailable,
        });
      });

      const currentDate = new Date().toISOString().split('T')[0];
      const fileName = `HotelAvailability_${cityCode}_${currentDate}.xlsx`;

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      throw new HttpException(
        error.response?.[0]?.title || 'Error generating Excel file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
