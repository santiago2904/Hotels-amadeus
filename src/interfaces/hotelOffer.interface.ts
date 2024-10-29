// noinspection SpellCheckingInspection

export interface ExtendedHotelOffersSearchResult {
  warnings?: { code: number; title: string; detail: string; source?: any }[];
  data: HotelOffer[]; // Puedes especificar más detalladamente si conoces la estructura exacta
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

// Interfaz para la oferta de hotel
export interface HotelOffer {
  type: string;
  hotel: Hotel;
  available: boolean;
  offers: Offer[];
  self: string;
}

// Interfaz para la descripción del tipo de habitación
export interface RoomTypeDescription {
  text: string;
  lang: string;
}

// Interfaz para la categoría y tipo de cama estimados
export interface RoomTypeEstimated {
  category: string;
  beds: number;
  bedType: string;
}

// Interfaz para la información de la habitación
export interface Room {
  type: string;
  typeEstimated: RoomTypeEstimated;
  description: RoomTypeDescription;
}

// Interfaz para la información de huéspedes
export interface Guests {
  adults: number;
}

// Interfaz para las variaciones de precio
export interface PriceVariation {
  startDate: string;
  endDate: string;
  base: string;
}

// Interfaz para el precio
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

// Interfaz para las políticas de cancelación
export interface CancellationPolicy {
  numberOfNights?: number;
  deadline?: string;
  amount?: string;
  description?: {
    text: string;
  };
  type?: string;
}

// Interfaz para las políticas
export interface Policies {
  cancellations: CancellationPolicy[];
  paymentType: string;
}

// Interfaz para cada oferta de habitación
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

// Interfaz para cada hotel en la respuesta
export interface Hotel {
  type?: string;
  hotelId?: string;
  chainCode?: string;
  dupeId?: string;
  name: string;
  cityCode?: string;
  latitude?: number;
  longitude?: number;
}

export const excelColumnConfig = [
  { header: 'Hotel Name', key: 'name', width: 30 },
  { header: 'Rating', key: 'rating', width: 10 },
  { header: 'Address', key: 'address', width: 40 },
  { header: 'Currency', key: 'currency', width: 10 },
  { header: 'Price Amount', key: 'amount', width: 15 },
  { header: 'Rooms Available', key: 'roomsAvailable', width: 15 },
];
