import { HotelSearchResponse } from '../interfaces/hotelOffer.interface';

export function HotelsAdapter(
  responseBody: any,
  cityCode: string,
  checkInDate: string,
  checkOutDate: string,
): HotelSearchResponse {
  const hotels = responseBody.data.map((hotelOffer) => {
    const hotel = hotelOffer.hotel;
    const offer = hotelOffer.offers[0];

    return {
      name: hotel.name,
      rating: hotel.rating || 4.0,
      address: `${hotel.latitude || 0}, ${hotel.longitude || 0}`,
      price: {
        currency: offer.price.currency,
        amount: parseFloat(offer.price.total),
      },
      roomsAvailable: hotelOffer.offers.length,
    };
  });

  return {
    city: cityCode,
    checkInDate,
    checkOutDate,
    hotels,
  };
}
