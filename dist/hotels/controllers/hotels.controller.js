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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelsController = void 0;
const common_1 = require("@nestjs/common");
const amadeus_service_1 = require("../../amadeus/services/amadeus.service");
const api_key_guard_1 = require("../../guards/api-key.guard");
const hotels_util_1 = require("../../utils/hotels.util");
const getHotels_dto_1 = require("../dto/getHotels.dto");
const hotelOffer_interface_1 = require("../../interfaces/hotelOffer.interface");
const ExcelJS = require("exceljs");
const swagger_1 = require("@nestjs/swagger");
const hotelsSearchResponse_dto_1 = require("../dto/hotelsSearchResponse.dto");
let HotelsController = class HotelsController {
    constructor(amadeusService) {
        this.amadeusService = amadeusService;
    }
    async getHotelAvailability(query) {
        const { cityCode, checkInDate, checkOutDate, guests, roomQuantity } = query;
        try {
            const response = await this.amadeusService.searchHotels(cityCode, checkInDate, checkOutDate, guests, roomQuantity);
            return (0, hotels_util_1.HotelsAdapter)(response, cityCode, checkInDate, checkOutDate);
        }
        catch (error) {
            throw new common_1.HttpException(error.response?.[0]?.title ||
                error.message ||
                'Error retrieving hotel availability', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getHotelAvailabilityExcel(query, res) {
        const { cityCode, checkInDate, checkOutDate, guests, roomQuantity } = query;
        try {
            const response = await this.amadeusService.searchHotels(cityCode, checkInDate, checkOutDate, guests, roomQuantity);
            const hotelsData = (0, hotels_util_1.HotelsAdapter)(response, cityCode, checkInDate, checkOutDate);
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Hotel Availability');
            worksheet.columns = hotelOffer_interface_1.excelColumnConfig.map((col) => ({
                header: col.header,
                key: col.key,
                width: col.width,
            }));
            hotelsData.hotels.forEach((hotel) => {
                worksheet.addRow({
                    name: hotel.name,
                    rating: hotel.rating,
                    address: hotel.address,
                    currency: hotel.price.currency,
                    amount: hotel.price.amount,
                    roomsAvailable: hotel.roomsAvailable,
                });
            });
            const currentDate = new Date().toISOString().split('T')[0];
            const fileName = `HotelAvailability_${cityCode}_${currentDate}.xlsx`;
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
            await workbook.xlsx.write(res);
            res.end();
        }
        catch (error) {
            throw new common_1.HttpException(error.response?.[0]?.title || 'Error generating Excel file', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.HotelsController = HotelsController;
__decorate([
    (0, common_1.Get)('availability'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve hotel availability by city' }),
    (0, swagger_1.ApiQuery)({ name: 'cityCode', type: String, description: 'City code (IATA)' }),
    (0, swagger_1.ApiQuery)({
        name: 'checkInDate',
        type: String,
        description: 'Check-in date (YYYY-MM-DD)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'checkOutDate',
        type: String,
        description: 'Check-out date (YYYY-MM-DD)',
    }),
    (0, swagger_1.ApiQuery)({ name: 'guests', type: Number, description: 'Number of guests' }),
    (0, swagger_1.ApiHeader)({ name: 'api-key', description: 'API Key for authentication', required: true }),
    (0, swagger_1.ApiQuery)({
        name: 'roomQuantity',
        type: Number,
        description: 'Number of rooms required',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successful response with hotel availability data',
        type: hotelsSearchResponse_dto_1.HotelSearchResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getHotels_dto_1.GetHotelAvailabilityDto]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "getHotelAvailability", null);
__decorate([
    (0, common_1.Get)('availability/excel'),
    (0, swagger_1.ApiOperation)({ summary: 'Export hotel availability to Excel' }),
    (0, swagger_1.ApiQuery)({ name: 'cityCode', type: String, description: 'City code (IATA)' }),
    (0, swagger_1.ApiQuery)({
        name: 'checkInDate',
        type: String,
        description: 'Check-in date (YYYY-MM-DD)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'checkOutDate',
        type: String,
        description: 'Check-out date (YYYY-MM-DD)',
    }),
    (0, swagger_1.ApiQuery)({ name: 'guests', type: Number, description: 'Number of guests' }),
    (0, swagger_1.ApiQuery)({
        name: 'roomQuantity',
        type: Number,
        description: 'Number of rooms required',
    }),
    (0, swagger_1.ApiHeader)({ name: 'api-key', description: 'API Key for authentication', required: true }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Excel file with hotel availability data',
        content: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {},
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getHotels_dto_1.GetHotelAvailabilityDto, Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "getHotelAvailabilityExcel", null);
exports.HotelsController = HotelsController = __decorate([
    (0, swagger_1.ApiTags)('hotels'),
    (0, common_1.Controller)('hotels'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    __metadata("design:paramtypes", [amadeus_service_1.AmadeusService])
], HotelsController);
//# sourceMappingURL=hotels.controller.js.map