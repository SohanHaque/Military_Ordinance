import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UsePipes, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { WeaponService } from './weapon.service';
import { Weapon } from './weapon.entity';
import { WeaponDto } from './weapon.dto';

@Controller('weapons')
export class WeaponController {
    constructor(private readonly weaponService: WeaponService) {}

    @Get()
    async findAll(): Promise<Weapon[]> {
        return await this.weaponService.findAll();
    }

    @Get('search')
    async searchByName(@Query('name') name: string): Promise<Weapon[]> {
        return this.weaponService.searchByName(name);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Weapon> {
        return this.weaponService.findOneById(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async addWeapon(@Body() weaponDto: WeaponDto): Promise<Weapon> {
        try {
            return await this.weaponService.addWeapon(weaponDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async updateWeapon(@Param('id') id: number, @Body() weaponDto: WeaponDto): Promise<Weapon> {
        return await this.weaponService.updateWeapon(id, weaponDto);
    }

    @Patch(':id')
    async updateWeaponInfo(@Param('id') id: number, @Body() partialWeaponDto: Partial<WeaponDto>): Promise<Weapon> {
        return await this.weaponService.updateWeaponInfo(id, partialWeaponDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.weaponService.deleteWeapon(id);
    }
}
