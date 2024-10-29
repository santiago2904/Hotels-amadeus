import { ApiProperty } from '@nestjs/swagger';

class HotelPriceDto {
  @ApiProperty({ example: 'USD', description: 'Currency code' })
  currency: string;

  @ApiProperty({ example: 150.0, description: 'Price amount' })
  amount: number;
}

class HotelDto {
  @ApiProperty({ example: 'Hotel Example', description: 'Name of the hotel' })
  name: string;

  @ApiProperty({ example: 4.5, description: 'Hotel rating' })
  rating: number;

  @ApiProperty({
    example: '123 Calle Siempre Viva',
    description: 'Hotel address',
  })
  address: string;

  @ApiProperty({ type: HotelPriceDto, description: 'Price details' })
  price: HotelPriceDto;

  @ApiProperty({ example: 5, description: 'Number of rooms available' })
  roomsAvailable: number;
}

export class HotelSearchResponseDto {
  @ApiProperty({ example: 'MAD', description: 'City code (IATA)' })
  city: string;

  @ApiProperty({
    example: '2024-12-01',
    description: 'Check-in date (YYYY-MM-DD)',
  })
  checkInDate: string;

  @ApiProperty({
    example: '2024-12-10',
    description: 'Check-out date (YYYY-MM-DD)',
  })
  checkOutDate: string;

  @ApiProperty({ type: [HotelDto], description: 'List of available hotels' })
  hotels: HotelDto[];
}
