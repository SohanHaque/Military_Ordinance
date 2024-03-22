import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weapon } from './weapon.entity';
import { WeaponController } from './weapon.controller';
import { WeaponService } from './weapon.service';
import { Weapon_inventory } from './weapon_inventory.entity';
import { Unit } from '../unit/unit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Weapon,Weapon_inventory,Unit ]), // Import the Unit entity
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