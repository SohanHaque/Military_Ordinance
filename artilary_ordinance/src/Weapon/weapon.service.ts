import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Weapon } from './weapon.entity';
import { WeaponDto } from './weapon.dto';

@Injectable()
export class WeaponService {
    constructor(
        @InjectRepository(Weapon)
        private weaponRepository: Repository<Weapon>,
    ) {}

    async findAll(): Promise<Weapon[]> {
        return await this.weaponRepository.find();
    }

    async findOneById(id: number): Promise<Weapon> {
        const weapon = await this.weaponRepository.findOne({ where: { id: id } });
        if (!weapon) {
            throw new NotFoundException(`Weapon with ID ${id} not found`);
        }
        return weapon;
    }

    async addWeapon(weaponDto: WeaponDto): Promise<Weapon> {
        const weapon = this.weaponRepository.create(weaponDto);
        return await this.weaponRepository.save(weapon);
    }

    async updateWeapon(id: number, updatedWeaponDto: WeaponDto): Promise<Weapon> {
        const weapon = await this.findOneById(id);
        const updatedWeapon = { ...weapon, ...updatedWeaponDto };
        return await this.weaponRepository.save(updatedWeapon);
    }

    async updateWeaponInfo(id: number, partialWeaponDto: Partial<WeaponDto>): Promise<Weapon> {
        const weapon = await this.findOneById(id);
        const updatedWeapon = { ...weapon, ...partialWeaponDto };
        return await this.weaponRepository.save(updatedWeapon);
    }

    async deleteWeapon(id: number): Promise<void> {
        await this.weaponRepository.delete(id);
    }

    async searchByName(name: string): Promise<Weapon[]> {
        return await this.weaponRepository.find({ where: { name: ILike(`%${name}%`) } });
    }
}
