import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Weapon } from './weapon.entity';
import { WeaponDto } from './weapon.dto';
import { WeaponInventoryDTO } from './weapon_inventory.dto'; // Correct import
import { Weapon_inventory } from './weapon_inventory.entity'; // Correct import
import { Unit } from '../unit/unit.entity';

@Injectable()
export class WeaponService {
    constructor(
        @InjectRepository(Weapon)
        private weaponRepository: Repository<Weapon>,
        @InjectRepository(Weapon_inventory)
        private readonly weaponInventoryRepository: Repository<Weapon_inventory>,
        @InjectRepository(Unit)
        private unitRepository: Repository<Unit>,
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

    async uploadPdf(weaponId: number, pdfFile: Express.Multer.File): Promise<{ pdfFilePath: string }> {
        const weapon = await this.weaponRepository.findOne({where: {id:weaponId}});
        if (!weapon) {
            throw new NotFoundException(`Weapon with ID ${weaponId} not found`);
        }

        // Save the file path to the weapon entity
        weapon.pdfFilePath = pdfFile.path;
        await this.weaponRepository.save(weapon);

        // Return the file path
        return { pdfFilePath: pdfFile.path };
    }
    async getPdfFilePath(weaponId: number): Promise<string> {
        const weapon = await this.weaponRepository.findOne({where: {id:weaponId}});
        if (!weapon || !weapon.pdfFilePath) {
            throw new NotFoundException(`PDF file not found for weapon with ID ${weaponId}`);
        }
        return weapon.pdfFilePath;
    }
//inventory


    async addWeaponInventory(weaponInventoryDto: WeaponInventoryDTO): Promise<Weapon_inventory> {
        const { weapon_id } = weaponInventoryDto;

        const weapon = await this.weaponRepository.findOne({ where: { id: weapon_id } });
        if (!weapon) {
            throw new NotFoundException(`Weapon with ID ${weapon_id} not found`);
        }

        const unitIdExists = await this.unitRepository.findOne({ where: { id: weaponInventoryDto.unit_id } });
        if (!unitIdExists) {
            throw new NotFoundException(`Unit with ID ${weaponInventoryDto.unit_id} not found`);
        }

        const weaponInventory = new Weapon_inventory();
        weaponInventory.count = weaponInventoryDto.count;
        weaponInventory.unit_id = weaponInventoryDto.unit_id;
        weaponInventory.weapon = weapon;

        return await this.weaponInventoryRepository.save(weaponInventory);
    }


    async findWeaponInventoryByWeaponId(weaponId: number): Promise<Weapon_inventory[]> {
        const inventories = await this.weaponInventoryRepository.find({ where: { id: weaponId } });
        if (!inventories || inventories.length === 0) {
            throw new NotFoundException(`No inventories found for weapon with ID ${weaponId}`);
        }
        return inventories;
    }

    async updateWeaponInventory(id: number, approvedBy: string): Promise<Weapon_inventory> {
        const weaponInventory = await this.weaponInventoryRepository.findOne({ where: { id:id } });
        if (!weaponInventory) {
            throw new NotFoundException(`Weapon inventory with ID ${id} not found`);
        }

        weaponInventory.approvedBy = approvedBy; // Update the approvedBy 
        weaponInventory.receiveTime = new Date();
        weaponInventory.status="approved"

        return await this.weaponInventoryRepository.save(weaponInventory);
    }

    async deleteInventory(id: number): Promise<string> {
        const deleted = await this.weaponInventoryRepository.delete(id);
        if (deleted.affected === 0) {
            throw new NotFoundException(`Inventory with ID ${id} not found`);
        }
        return `Inventory with ID ${id} has been successfully deleted`;

    }

    
}
