import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Unit } from './unit.entity';

@Injectable()
export class UnitService {
    constructor(
        @InjectRepository(Unit)
        private unitRepository: Repository<Unit>,
    ) {}

    async findAll(): Promise<Unit[]> {
        return await this.unitRepository.find();
    }

    async findOneById(id: number): Promise<Unit> {
        const unit = await this.unitRepository.findOne({ where: { id: id } });
        if (!unit) {
            throw new NotFoundException(`Unit with ID ${id} not found`);
        }
        return unit;
    }

    async addUnit(unit: Unit): Promise<Unit> {
        return await this.unitRepository.save(unit);
    }

    async updateCondition(id: number, updatedUnit: Unit): Promise<Unit> {
        const unit = await this.findOneById(id);
        return await this.unitRepository.save({ ...unit, ...updatedUnit });
    }

    async updateUnitInfo(id: number, partialUnit: Partial<Unit>): Promise<Unit> {
        const unit = await this.findOneById(id);
        return await this.unitRepository.save({ ...unit, ...partialUnit });
    }

    async disbandUnit(id: number): Promise<void> {
        await this.unitRepository.delete(id);
    }

    async searchByName(name: string): Promise<Unit[]> {
        return await this.unitRepository.find({ where: { name: ILike(`%${name}%`) } });
    }
}
