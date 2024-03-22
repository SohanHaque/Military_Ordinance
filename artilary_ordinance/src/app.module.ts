import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitModule } from './unit/unit.module';
import { Unit } from './unit/unit.entity';
import { WeaponModule } from './Weapon/weapon.module';
import { Weapon } from './Weapon/weapon.entity';
import { Weapon_inventory } from './Weapon/weapon_inventory.entity';
import { Officers } from './unit/officers.entity';
import { Drills } from './Drills/drills.entity';
import { DrillsModule } from './Drills/drills.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'new_password',
      database: 'storage',
      entities: [Unit,Weapon,Weapon_inventory,Officers,Drills ],
      synchronize: true,
    }),
    UnitModule, WeaponModule,DrillsModule,
  ],
})
export class AppModule {}
