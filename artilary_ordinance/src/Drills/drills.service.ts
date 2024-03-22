// drills.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drills } from './drills.entity';
import { DrillsDto } from './drills.dto';

@Injectable()
export class DrillsService {
    constructor(
        @InjectRepository(Drills)
        private readonly drillsRepository: Repository<Drills>,
    ) {}

    async create(drillsDto: DrillsDto): Promise<Drills> {
        const drill = this.drillsRepository.create(drillsDto);
        return await this.drillsRepository.save(drill);
    }

    async findAll(): Promise<Drills[]> {
        return await this.drillsRepository.find();
    }

    async updateDesignatedToAndStatus(drillId: number, designatedTo: string): Promise<Drills> {
        const drill = await this.drillsRepository.findOne({ where: { id: drillId } });
        if (!drill) {
            throw new NotFoundException(`Drill with ID ${drillId} not found`);
        }
        drill.designatedTo = designatedTo;
        drill.status = 'accepted';
        return await this.drillsRepository.save(drill);
    }
}
