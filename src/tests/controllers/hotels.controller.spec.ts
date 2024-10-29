import { AmadeusService } from '../../amadeus/services/amadeus.service';
import { ApiKeyGuard } from '../../guards/api-key.guard';

import { HttpStatus, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { HotelsController } from '../../hotels/controllers/hotels.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { GetHotelAvailabilityDto } from '../../hotels/dto/getHotels.dto';
import { mockHotels, mockHotelsData } from '../mocks/mockHotels.mock';

describe('HotelsController', () => {
  let controller: HotelsController;
  let amadeusService: AmadeusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelsController],
      providers: [
        {
          provide: AmadeusService,
          useValue: {
            searchHotels: jest.fn(),
            getHotelIdsByCity: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(ApiKeyGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<HotelsController>(HotelsController);
    amadeusService = module.get<AmadeusService>(AmadeusService);
  });

  describe('getHotelAvailability', () => {
    it('should return hotel availability data using mock data', async () => {
      const query: GetHotelAvailabilityDto = {
        cityCode: 'MAD',
        checkInDate: '2024-12-01',
        checkOutDate: '2024-12-10',
        guests: 2,
        roomQuantity: 1,
      };

      jest
        .spyOn(amadeusService, 'searchHotels')
        .mockResolvedValue(mockHotels as any);

      const result = await controller.getHotelAvailability(query);

      expect(result).toEqual(mockHotelsData);
      expect(amadeusService.searchHotels).toHaveBeenCalledWith(
        query.cityCode,
        query.checkInDate,
        query.checkOutDate,
        query.guests,
        query.roomQuantity,
      );
    });

    it('should throw an HttpException if Amadeus service fails', async () => {
      const query: GetHotelAvailabilityDto = {
        cityCode: 'MAD',
        checkInDate: '2024-12-01',
        checkOutDate: '2024-12-10',
        guests: 2,
        roomQuantity: 1,
      };

      jest
        .spyOn(amadeusService, 'searchHotels')
        .mockRejectedValue(
          new HttpException(
            'Error retrieving hotel availability',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );

      await expect(controller.getHotelAvailability(query)).rejects.toThrow(
        new HttpException(
          'Error retrieving hotel availability',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('getHotelAvailabilityExcel', () => {
    it('should call searchHotels and set response headers for Excel', async () => {
      const query: GetHotelAvailabilityDto = {
        cityCode: 'MAD',
        checkInDate: '2024-12-01',
        checkOutDate: '2024-12-10',
        guests: 2,
        roomQuantity: 1,
      };

      jest
        .spyOn(amadeusService, 'searchHotels')
        .mockResolvedValue(mockHotels as any);

      const res = {
        setHeader: jest.fn(),
        end: jest.fn(),
      } as unknown as Response;

      jest
        .spyOn(controller, 'getHotelAvailabilityExcel')
        .mockImplementation(async () => {
          amadeusService.searchHotels(
            query.cityCode,
            query.checkInDate,
            query.checkOutDate,
            query.guests,
            query.roomQuantity,
          );
          res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          );
          res.setHeader(
            'Content-Disposition',
            'attachment; filename="hotel-availability.xlsx"',
          );
          res.end();
        });

      await controller.getHotelAvailabilityExcel(query, res);

      expect(amadeusService.searchHotels).toHaveBeenCalledWith(
        query.cityCode,
        query.checkInDate,
        query.checkOutDate,
        query.guests,
        query.roomQuantity,
      );

      expect(res.setHeader).toHaveBeenCalledWith(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      expect(res.setHeader).toHaveBeenCalledWith(
        'Content-Disposition',
        expect.any(String),
      );
      expect(res.end).toHaveBeenCalled();
    });

    it('should throw an HttpException if exporting to Excel fails', async () => {
      const query: GetHotelAvailabilityDto = {
        cityCode: 'MAD',
        checkInDate: '2024-12-01',
        checkOutDate: '2024-12-10',
        guests: 2,
        roomQuantity: 1,
      };

      jest
        .spyOn(amadeusService, 'searchHotels')
        .mockRejectedValue(
          new HttpException(
            'Error generating Excel file',
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );

      const res = {} as Response;

      await expect(
        controller.getHotelAvailabilityExcel(query, res),
      ).rejects.toThrow(
        new HttpException(
          'Error generating Excel file',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
