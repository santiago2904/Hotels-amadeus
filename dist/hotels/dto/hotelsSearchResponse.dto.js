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
exports.HotelSearchResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class HotelPriceDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USD', description: 'Currency code' }),
    __metadata("design:type", String)
], HotelPriceDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150.0, description: 'Price amount' }),
    __metadata("design:type", Number)
], HotelPriceDto.prototype, "amount", void 0);
class HotelDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hotel Example', description: 'Name of the hotel' }),
    __metadata("design:type", String)
], HotelDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4.5, description: 'Hotel rating' }),
    __metadata("design:type", Number)
], HotelDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123 Calle Siempre Viva',
        description: 'Hotel address',
    }),
    __metadata("design:type", String)
], HotelDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: HotelPriceDto, description: 'Price details' }),
    __metadata("design:type", HotelPriceDto)
], HotelDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'Number of rooms available' }),
    __metadata("design:type", Number)
], HotelDto.prototype, "roomsAvailable", void 0);
class HotelSearchResponseDto {
}
exports.HotelSearchResponseDto = HotelSearchResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MAD', description: 'City code (IATA)' }),
    __metadata("design:type", String)
], HotelSearchResponseDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-12-01',
        description: 'Check-in date (YYYY-MM-DD)',
    }),
    __metadata("design:type", String)
], HotelSearchResponseDto.prototype, "checkInDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2024-12-10',
        description: 'Check-out date (YYYY-MM-DD)',
    }),
    __metadata("design:type", String)
], HotelSearchResponseDto.prototype, "checkOutDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [HotelDto], description: 'List of available hotels' }),
    __metadata("design:type", Array)
], HotelSearchResponseDto.prototype, "hotels", void 0);
//# sourceMappingURL=hotelsSearchResponse.dto.js.map