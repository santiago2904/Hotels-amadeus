import { Module } from '@nestjs/common';
import { HotelsController } from './controllers/hotels.controller';
import { AmadeusModule } from '../amadeus/amadeus.module';

@Module({
  controllers: [HotelsController],
  imports: [AmadeusModule],
})
export class HotelsModule {}
