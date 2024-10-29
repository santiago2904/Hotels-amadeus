import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // Ignora propiedades no especificadas en los DTO
      forbidNonWhitelisted: true, // Rechaza propiedades adicionales no especificadas
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Hotel Availability API')
    .setDescription(
      'API que permite consultar la disponibilidad de hoteles por ciudad y exportar la' +
        ' información en formato Excel. Esta documentación respalda una prueba técnica para evaluar la' +
        ' capacidad de integración con Amadeus.',
    )
    .setVersion('1.0')
    .addTag('hotels')
    .addApiKey({ type: 'apiKey', name: 'api-key', in: 'header' }, 'apiKey')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
