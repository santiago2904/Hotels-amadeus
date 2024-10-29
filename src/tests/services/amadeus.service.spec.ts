import { Test, TestingModule } from '@nestjs/testing';
import { AmadeusService } from '../../amadeus/services/amadeus.service';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus } from '@nestjs/common';

jest.mock('amadeus-ts');

describe('AmadeusService', () => {
  let service: AmadeusService;
  let amadeusMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AmadeusService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key) =>
              key === 'AMADEUS_API_KEY' ? 'test-key' : 'test-secret',
            ),
          },
        },
      ],
    }).compile();

    service = module.get<AmadeusService>(AmadeusService);
    amadeusMock = require('amadeus-ts').default;
  });

  describe('getHotelIdsByCity', () => {
    it('should return hotel IDs for a valid city code', async () => {
      amadeusMock.prototype.referenceData = {
        locations: {
          hotels: {
            byCity: {
              get: jest.fn().mockResolvedValue({
                data: [{ hotelId: 'HOTEL_1' }, { hotelId: 'HOTEL_2' }],
              }),
            },
          },
        },
      };

      const result = await service.getHotelIdsByCity('MAD');
      expect(result).toEqual(['HOTEL_1', 'HOTEL_2']);
    });

    it('should throw HttpException with parsed error message if API call fails', async () => {
      amadeusMock.prototype.referenceData = {
        locations: {
          hotels: {
            byCity: {
              get: jest.fn().mockRejectedValue({
                response: {
                  body: JSON.stringify({
                    errors: [
                      {
                        title: 'API Error',
                        detail: 'Invalid city code',
                        code: 1234,
                      },
                    ],
                  }),
                },
              }),
            },
          },
        },
      };

      await expect(service.getHotelIdsByCity('INVALID')).rejects.toThrow(
        new HttpException(
          'API Error: Invalid city code (Code: 1234)',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('searchHotels', () => {
    it('should return search results for a valid hotel search', async () => {
      jest
        .spyOn(service, 'getHotelIdsByCity')
        .mockResolvedValue(['HOTEL_1', 'HOTEL_2']);

      amadeusMock.prototype.shopping = {
        hotelOffersSearch: {
          get: jest.fn().mockResolvedValue({
            body: JSON.stringify({
              data: [{ offerId: 'OFFER_1' }],
            }),
          }),
        },
      };

      const result = await service.searchHotels(
        'MAD',
        '2024-12-01',
        '2024-12-10',
        2,
        1,
      );
      expect(result).toEqual({ data: [{ offerId: 'OFFER_1' }] });
    });

    it('should throw HttpException if no hotels are found', async () => {
      jest.spyOn(service, 'getHotelIdsByCity').mockResolvedValue([]);

      await expect(
        service.searchHotels('EMPTY', '2024-12-01', '2024-12-10', 2, 1),
      ).rejects.toThrow(
        new HttpException(
          'No hotels found for the specified city',
          HttpStatus.NOT_FOUND,
        ),
      );
    });

    it('should throw HttpException with error description if API call fails', async () => {
      jest.spyOn(service, 'getHotelIdsByCity').mockResolvedValue(['HOTEL_1']);

      amadeusMock.prototype.shopping = {
        hotelOffersSearch: {
          get: jest.fn().mockRejectedValue(new Error('API connection error')),
        },
      };

      await expect(
        service.searchHotels('MAD', '2024-12-01', '2024-12-10', 2, 1),
      ).rejects.toThrow(HttpException);
    });
  });
});
