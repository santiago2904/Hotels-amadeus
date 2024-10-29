import {
  ExtendedHotelOffersSearchResult,
  HotelSearchResponse,
} from '../../interfaces/hotelOffer.interface';

export const mockHotels: ExtendedHotelOffersSearchResult = {
  warnings: [
    {
      code: 1001,
      title: 'Mock Warning Title',
      detail: 'This is a mock warning detail.',
      source: { parameter: 'testParameter' },
    },
  ],
  data: [
    {
      type: 'hotel-offers',
      hotel: {
        type: 'hotel',
        hotelId: 'HTL123',
        chainCode: 'HC',
        dupeId: 'DUPE123',
        name: 'Hotel Mock 1',
        cityCode: 'MAD',
        latitude: 40.4168,
        longitude: -3.7038,
        rating: 0,
        address: '',
        price: undefined,
        roomsAvailable: 0,
      },
      available: true,
      offers: [
        {
          id: 'OFF123',
          checkInDate: '2024-12-01',
          checkOutDate: '2024-12-10',
          rateCode: 'RAC',
          room: {
            type: 'DLX',
            typeEstimated: {
              category: 'DELUXE_ROOM',
              beds: 1,
              bedType: 'KING',
            },
            description: {
              text: 'Deluxe King Room with a city view',
              lang: 'EN',
            },
          },
          guests: {
            adults: 2,
          },
          price: {
            currency: 'EUR',
            base: '120.00',
            total: '150.00',
            variations: {
              average: { base: '100.00' },
              changes: [
                {
                  startDate: '2024-12-01',
                  endDate: '2024-12-02',
                  base: '120.00',
                },
                {
                  startDate: '2024-12-02',
                  endDate: '2024-12-03',
                  base: '130.00',
                },
              ],
            },
          },
          policies: {
            cancellations: [
              {
                numberOfNights: 1,
                deadline: '2024-11-30T23:59:00-05:00',
                amount: '50.00',
                description: { text: 'Full refund until the deadline' },
              },
            ],
            paymentType: 'deposit',
          },
          self: 'https://mockurl.com/hotel-offers/OFF123',
        },
      ],
      self: 'https://mockurl.com/hotel/HTL123',
    },
  ],
};

export const mockHotelsData: HotelSearchResponse = {
  city: 'MAD',
  checkInDate: '2024-12-01',
  checkOutDate: '2024-12-10',
  hotels: [
    {
      name: 'Hotel Mock 1',
      rating: 4,
      address: '40.4168, -3.7038',
      price: {
        currency: 'EUR',
        amount: 150,
      },
      roomsAvailable: 1,
    },
  ],
};
