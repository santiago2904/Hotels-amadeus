import { AmadeusService } from '../../amadeus/services/amadeus.service';
import { GetHotelAvailabilityDto } from '../dto/getHotels.dto';
import { HotelSearchResponse } from '../../interfaces/hotelOffer.interface';
import { Response } from 'express';
export declare class HotelsController {
    private readonly amadeusService;
    constructor(amadeusService: AmadeusService);
    getHotelAvailability(query: GetHotelAvailabilityDto): Promise<HotelSearchResponse>;
    getHotelAvailabilityExcel(query: GetHotelAvailabilityDto, res: Response): Promise<void>;
}
