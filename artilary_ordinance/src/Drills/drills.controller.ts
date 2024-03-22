// drills.controller.ts
import { Controller, Get, Post, Put, Body, Param, ValidationPipe } from '@nestjs/common';
import { DrillsService } from './drills.service';
import { DrillsDto } from './drills.dto';
import { Drills } from './drills.entity';

@Controller('drills')
export class DrillsController {
    constructor(private readonly drillsService: DrillsService) {}

    @Get()
    async findAll(): Promise<Drills[]> {
        return this.drillsService.findAll();
    }

    @Post()
    async create(@Body(new ValidationPipe()) drillsDto: DrillsDto): Promise<Drills> {
        return this.drillsService.create(drillsDto);
    }

    @Put('accept/:id')
    async updateDesignatedToAndStatus(
        @Param('id') drillId: number,
        @Body('designatedTo') designatedTo: string,
    ): Promise<Drills> {
        return this.drillsService.updateDesignatedToAndStatus(drillId, designatedTo);
    }
}
