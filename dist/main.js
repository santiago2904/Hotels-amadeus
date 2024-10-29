"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Hotel Availability API')
        .setDescription('API que permite consultar la disponibilidad de hoteles por ciudad y exportar la' +
        ' información en formato Excel. Esta documentación respalda una prueba técnica para evaluar la' +
        ' capacidad de integración con Amadeus.')
        .setVersion('1.0')
        .addTag('hotels')
        .addApiKey({ type: 'apiKey', name: 'api-key', in: 'header' }, 'apiKey')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map