import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './unit.entity';
import { UnitController } from './unit.controller';
import { UnitService } from './unit.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Unit]), // Import the Unit entity
  ],
  controllers: [UnitController], // Include the UnitController
  providers: [
    UnitService, // Include the UnitService
    {
      provide: 'APP_PIPE',
      useClass: ValidationPipe,
    },
  ],
})
export class UnitModule {}