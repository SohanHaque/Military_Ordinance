import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UsePipes, ValidationPipe, HttpException, HttpStatus, UnauthorizedException, Session, UseGuards } from '@nestjs/common';
import { UnitService } from './unit.service';
import { Unit } from './unit.entity';
import { Officers } from './officers.entity';
import { OfficersDto } from './officers.dto';
import { LoginDTO } from './login.dto';
import { SessionGuard } from './session.guard';

@Controller('units')
export class UnitController {
    constructor(private readonly unitService: UnitService) {}

    @Post('/login')
    async login(@Body() data: LoginDTO, @Session() session) {
        const loggedInUnit = await this.unitService.login(data);
        if (loggedInUnit) {
            session.email = data.email;
            return { message: 'Success login', email: data.email };
        } else {
            throw new UnauthorizedException('Invalid login');
        }
    }

    @Post('/signout')
    async signout(@Session() session) {
        if (session.email) {
            session.destroy();
            return { message: 'Successfully logged out' };
        } else {
            throw new UnauthorizedException('Not logged in');
        }
    }

    
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
    @UseGuards(SessionGuard)
    async updateCondition(@Param('id') id: number, @Body() unit: Unit): Promise<Unit> {
        return await this.unitService.updateCondition(id, unit);
    }

    @Patch(':id')
    @UseGuards(SessionGuard)
    async updateUnitInfo(@Param('id') id: number, @Body() partialUnit: Partial<Unit>): Promise<Unit> {
        return await this.unitService.updateUnitInfo(id, partialUnit);
    }

    @Delete(':id')
    @UseGuards(SessionGuard)
    async delete(@Param('id') id: number): Promise<void> {
        await this.unitService.disbandUnit(id);
    }

    //for officers
    
    
    @Post('officers')
    @UseGuards(SessionGuard)
    @UsePipes(new ValidationPipe())
    async addOfficer(@Body() officersDto: OfficersDto): Promise<Officers> {
        try {
            return await this.unitService.addOfficer(officersDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

   @Get('officers')
    async findAllOfficers(): Promise<Officers[]> {
        return await this.unitService.findAllOfficers();
    }

    @Get('officer/:id')
    @UseGuards(SessionGuard)
    async findOfficerById(@Param('id') id: number): Promise<Officers> {
        return await this.unitService.findOfficerById(id);
    }
}
