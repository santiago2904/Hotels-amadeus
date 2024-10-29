"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmadeusService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const amadeus_ts_1 = require("amadeus-ts");
const MAX_HOTEL_IDS = 50;
const DEFAULT_RADIUS = 50;
const DEFAULT_RADIUS_UNIT = 'KM';
let AmadeusService = class AmadeusService {
    constructor(configService) {
        this.configService = configService;
        this.amadeus = this.createAmadeusClient();
    }
    createAmadeusClient() {
        return new amadeus_ts_1.default({
            clientId: this.configService.get('AMADEUS_API_KEY') || '',
            clientSecret: this.configService.get('AMADEUS_API_SECRET') || '',
            hostname: 'test',
        });
    }
    async getHotelIdsByCity(cityCode) {
        try {
            const response = await this.amadeus.referenceData.locations.hotels.byCity.get({
                cityCode,
                radius: DEFAULT_RADIUS,
                radiusUnit: DEFAULT_RADIUS_UNIT,
            });
            return response.data.map((hotel) => hotel.hotelId);
        }
        catch (error) {
            let errorMessage = 'Error retrieving hotel IDs';
            if (error.response?.body) {
                try {
                    const parsedBody = JSON.parse(error.response.body);
                    if (parsedBody.errors && parsedBody.errors.length > 0) {
                        const firstError = parsedBody.errors[0];
                        errorMessage = `${firstError.title}: ${firstError.detail} (Code: ${firstError.code})`;
                    }
                }
                catch (parseError) {
                    console.error('Error parsing error response body:', parseError);
                }
            }
            throw new common_1.HttpException(errorMessage, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async searchHotels(cityCode, checkInDate, checkOutDate, guests, roomQuantity) {
        try {
            const hotelIds = await this.getHotelIdsByCity(cityCode);
            if (hotelIds.length === 0) {
                throw new common_1.HttpException('No hotels found for the specified city', common_1.HttpStatus.NOT_FOUND);
            }
            const maxLength = hotelIds.length > MAX_HOTEL_IDS ? MAX_HOTEL_IDS : hotelIds.length;
            const searchParams = {
                hotelIds: hotelIds.slice(0, maxLength).join(','),
                checkInDate,
                checkOutDate,
                adults: guests,
                roomQuantity,
            };
            const response = await this.amadeus.shopping.hotelOffersSearch.get(searchParams);
            return JSON.parse(response.body);
        }
        catch (error) {
            if (error instanceof amadeus_ts_1.ResponseError) {
                console.error('Amadeus API error:', error.description);
            }
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException(error.description, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AmadeusService = AmadeusService;
exports.AmadeusService = AmadeusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AmadeusService);
//# sourceMappingURL=amadeus.service.js.map