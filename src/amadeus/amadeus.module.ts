import { Module } from '@nestjs/common';
import { AmadeusService } from './services/amadeus.service';

@Module({
  providers: [AmadeusService],
  exports: [AmadeusService],
})
export class AmadeusModule {}
