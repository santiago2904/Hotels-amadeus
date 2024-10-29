import { ConfigService } from '@nestjs/config';
import { ExtendedHotelOffersSearchResult } from '../../interfaces/hotelOffer.interface';
export declare class AmadeusService {
    private configService;
    private amadeus;
    constructor(configService: ConfigService);
    private createAmadeusClient;
    getHotelIdsByCity(cityCode: string): Promise<string[]>;
    searchHotels(cityCode: string, checkInDate: string, checkOutDate: string, guests: number, roomQuantity: number): Promise<ExtendedHotelOffersSearchResult>;
}
