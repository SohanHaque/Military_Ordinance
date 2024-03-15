import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weapon } from './weapon.entity';
import { WeaponController } from './weapon.controller';
import { WeaponService } from './weapon.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Weapon]), // Import the Unit entity
  ],
  controllers: [WeaponController], // Include the UnitController
  providers: [
    WeaponService, // Include the UnitService
    {
      provide: 'APP_PIPE',
      useClass: ValidationPipe,
    },
  ],
})
export class WeaponModule {}