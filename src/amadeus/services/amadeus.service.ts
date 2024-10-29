import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Amadeus, { ResponseError } from 'amadeus-ts';
import { ExtendedHotelOffersSearchResult } from '../../interfaces/hotelOffer.interface';

const MAX_HOTEL_IDS = 50;
const DEFAULT_RADIUS = 50;
const DEFAULT_RADIUS_UNIT = 'KM';

@Injectable()
export class AmadeusService {
  private amadeus: Amadeus;

  constructor(private configService: ConfigService) {
    this.amadeus = this.createAmadeusClient();
  }

  private createAmadeusClient(): Amadeus {
    return new Amadeus({
      clientId: this.configService.get<string>('AMADEUS_API_KEY') || '',
      clientSecret: this.configService.get<string>('AMADEUS_API_SECRET') || '',
      hostname: 'test',
    });
  }

  async getHotelIdsByCity(cityCode: string): Promise<string[]> {
    try {
      const response =
        await this.amadeus.referenceData.locations.hotels.byCity.get({
          cityCode,
          radius: DEFAULT_RADIUS,
          radiusUnit: DEFAULT_RADIUS_UNIT,
        });
      return response.data.map((hotel) => hotel.hotelId);
    } catch (error) {
      let errorMessage = 'Error retrieving hotel IDs';
      if (error.response?.body) {
        try {
          const parsedBody = JSON.parse(error.response.body);
          if (parsedBody.errors && parsedBody.errors.length > 0) {
            const firstError = parsedBody.errors[0];
            errorMessage = `${firstError.title}: ${firstError.detail} (Code: ${firstError.code})`;
          }
        } catch (parseError) {
          console.error('Error parsing error response body:', parseError);
        }
      }
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }
  }

  async searchHotels(
    cityCode: string,
    checkInDate: string,
    checkOutDate: string,
    guests: number,
    roomQuantity: number,
  ): Promise<ExtendedHotelOffersSearchResult> {
    try {
      const hotelIds = await this.getHotelIdsByCity(cityCode);
      if (hotelIds.length === 0) {
        throw new HttpException(
          'No hotels found for the specified city',
          HttpStatus.NOT_FOUND,
        );
      }

      const maxLength =
        hotelIds.length > MAX_HOTEL_IDS ? MAX_HOTEL_IDS : hotelIds.length;

      const searchParams = {
        hotelIds: hotelIds.slice(0, maxLength).join(','),
        checkInDate,
        checkOutDate,
        adults: guests,
        roomQuantity,
      };

      const response =
        await this.amadeus.shopping.hotelOffersSearch.get(searchParams);
      return JSON.parse(response.body);
    } catch (error) {
      if (error instanceof ResponseError) {
        console.error('Amadeus API error:', error.description);
      }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        error.description,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
