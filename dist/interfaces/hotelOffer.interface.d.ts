export interface ExtendedHotelOffersSearchResult {
    warnings?: {
        code: number;
        title: string;
        detail: string;
        source?: any;
    }[];
    data: HotelOffer[];
}
export interface HotelPrice {
    currency: string;
    amount: number;
}
export interface Hotel {
    name: string;
    rating: number;
    address: string;
    price: HotelPrice;
    roomsAvailable: number;
}
export interface HotelSearchResponse {
    city: string;
    checkInDate: string;
    checkOutDate: string;
    hotels: Hotel[];
}
export interface HotelLocation {
    latitude: number;
    longitude: number;
}
export interface RoomTypeDescription {
    text: string;
    lang: string;
}
export interface RoomTypeEstimated {
    category: string;
    beds: number;
    bedType: string;
}
export interface Room {
    type: string;
    typeEstimated: RoomTypeEstimated;
    description: RoomTypeDescription;
}
export interface Guests {
    adults: number;
}
export interface PriceVariation {
    startDate: string;
    endDate: string;
    base: string;
}
export interface Price {
    currency: string;
    base: string;
    total: string;
    variations: {
        average: {
            base: string;
        };
        changes: PriceVariation[];
    };
}
export interface CancellationPolicy {
    numberOfNights?: number;
    deadline?: string;
    amount?: string;
    description?: {
        text: string;
    };
    type?: string;
}
export interface Policies {
    cancellations: CancellationPolicy[];
    paymentType: string;
}
export interface Offer {
    id: string;
    checkInDate: string;
    checkOutDate: string;
    rateCode: string;
    room: Room;
    guests: Guests;
    price: Price;
    policies: Policies;
    self: string;
}
export interface Hotel {
    type: string;
    hotelId: string;
    chainCode: string;
    dupeId: string;
    name: string;
    cityCode: string;
    latitude: number;
    longitude: number;
}
export interface HotelOffer {
    type: string;
    hotel: Hotel;
    available: boolean;
    offers: Offer[];
    self: string;
}
export interface Warning {
    code: number;
    title: string;
    detail: string;
    source: {
        parameter: string;
    };
}
export interface AmadeusHotelSearchResponse {
    data: HotelOffer[];
    warnings: Warning[];
}
export declare const excelColumnConfig: {
    header: string;
    key: string;
    width: number;
}[];
