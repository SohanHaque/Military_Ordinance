import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { UnitService } from './unit.service';
import { Unit } from './unit.entity';

@Controller('units')
export class UnitController {
    constructor(private readonly unitService: UnitService) {}

    @Get()
    async findAll(): Promise<Unit[]> {
        return await this.unitService.findAll();
    }

    @Get('search')
    async searchByName(@Query('name') name: string): Promise<Unit[]> {
        return this.unitService.searchByName(name);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Unit> {
        return this.unitService.findOneById(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async addUnit(@Body() unit: Unit): Promise<Unit> {
        try {
            return await this.unitService.addUnit(unit);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async updateCondition(@Param('id') id: number, @Body() unit: Unit): Promise<Unit> {
        return await this.unitService.updateCondition(id, unit);
    }

    @Patch(':id')
    async updateUnitInfo(@Param('id') id: number, @Body() partialUnit: Partial<Unit>): Promise<Unit> {
        return await this.unitService.updateUnitInfo(id, partialUnit);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.unitService.disbandUnit(id);
    }
}
