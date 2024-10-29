import { IsString, IsDateString, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class GetHotelAvailabilityDto {
  @IsString()
  cityCode: string;

  @IsDateString()
  checkInDate: string;

  @IsDateString()
  checkOutDate: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  guests: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  roomQuantity: number;
}
