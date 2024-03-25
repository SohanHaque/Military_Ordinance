import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Unit } from './unit.entity';
import { OfficersDto } from './officers.dto';
import { Officers } from './officers.entity';
import { LoginDTO } from './login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UnitService {
    constructor(
        @InjectRepository(Unit)
        private unitRepository: Repository<Unit>,
        @InjectRepository(Officers)
        private readonly officersRepository: Repository<Officers>,
    ) {}

    async login(loginDTO: LoginDTO): Promise<Unit | null> {
        const { email, password } = loginDTO;
        const unit = await this.unitRepository.findOne({ where: { email } });
        
        if (!unit) {
            return null; // Unit not found with given email
        }

        const isPasswordValid = await bcrypt.compare(password, unit.password);
        
        if (!isPasswordValid) {
            return null; // Invalid password
        }

        return unit; // Login successful
    }
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
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(unit.password, 10);
        unit.password = hashedPassword;
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
    //officers
   

    async addOfficer(officersDto: OfficersDto): Promise<Officers> {
        const { name, rank, unit_Id } = officersDto;
        
        // Find the unit by its ID
        const unit = await this.unitRepository.findOne({ where: { id: unit_Id } });
        
        if (!unit) {
            throw new NotFoundException(`Unit with ID ${unit_Id} not found`);
        }
        
        // Create the officer entity and associate it with the found unit
        const officer = this.officersRepository.create({ name, rank, unit });
        
        // Save the officer entity
        return await this.officersRepository.save(officer);
    }
    
    async findAllOfficers(): Promise<Officers[]> {
        return await this.officersRepository.find();
    }

    async findOfficerById(id: number): Promise<Officers> {
        const officer = await this.officersRepository.findOne({ where: { id: id } });
        if (!officer) {
            throw new NotFoundException(`Officer with ID ${id} not found`);
        }
        return officer;
    }
}
