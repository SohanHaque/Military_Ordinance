import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitModule } from './unit/unit.module';
import { Unit } from './unit/unit.entity';
import { WeaponModule } from './Weapon/weapon.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'new_password',
      database: 'storage',
      entities: [Unit],
      synchronize: true,
    }),
    UnitModule, WeaponModule,
  ],
})
export class AppModule {}
