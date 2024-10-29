declare class HotelPriceDto {
    currency: string;
    amount: number;
}
declare class HotelDto {
    name: string;
    rating: number;
    address: string;
    price: HotelPriceDto;
    roomsAvailable: number;
}
export declare class HotelSearchResponseDto {
    city: string;
    checkInDate: string;
    checkOutDate: string;
    hotels: HotelDto[];
}
export {};
