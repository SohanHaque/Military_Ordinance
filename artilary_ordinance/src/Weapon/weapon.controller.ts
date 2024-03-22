import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UsePipes, ValidationPipe, HttpException, HttpStatus, NotFoundException, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { WeaponService } from './weapon.service';
import { Weapon } from './weapon.entity';
import { WeaponDto } from './weapon.dto';
import { WeaponInventoryDTO } from './weapon_inventory.dto';
import { Weapon_inventory } from './Weapon_inventory.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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


    @Put(':id/pdf')
@UseInterceptors(FileInterceptor('pdf', {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            return cb(null, `${randomName}${extname(file.originalname)}`);
        }
    })
}))
async uploadPdf(
    @Param('id') weaponId: number,
    @UploadedFile() pdfFile: Express.Multer.File
): Promise<{ pdfFilePath: string }> { // Change the return type to string
    try {
        const result = await this.weaponService.uploadPdf(weaponId, pdfFile);
        return result; // Return the file path directly
    } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
}

@Get(':id/pdf')
async downloadPdf(@Param('id') weaponId: number, @Res() res: any): Promise<void> {
    try {
        const pdfPath = await this.weaponService.getPdfFilePath(weaponId);
        res.download(pdfPath); // Stream the PDF file back to the client
    } catch (error) {
        throw new HttpException('PDF file not found', HttpStatus.NOT_FOUND);
    }
}

    //for inventory
    @Post('inventory')
    @UsePipes(new ValidationPipe())
    async addWeaponInventory(
        @Body() weaponInventoryDto: WeaponInventoryDTO
    ): Promise<Weapon_inventory> {
        try {
            return await this.weaponService.addWeaponInventory(weaponInventoryDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    // Find Weapon_inventory by weaponId
    @Get('inventory/:Id')
    async findWeaponInventoryByWeaponId(
        @Param('Id') Id: number
    ): Promise<Weapon_inventory[]> {
        return this.weaponService.findWeaponInventoryByWeaponId(Id);
    }

    @Put('inventory/:id/:approvedBy') 
    @UsePipes(new ValidationPipe())
    async updateWeaponInventory(
        @Param('id') id: number, 
        @Param('approvedBy') approvedBy: string 
    ): Promise<Weapon_inventory> {
        try {
            return await this.weaponService.updateWeaponInventory(id, approvedBy); 
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('inventory/:id')
    @Delete(':id')
    async deleteInventory(@Param('id') id: number): Promise<string> {
        try {
            const message = await this.weaponService.deleteInventory(id);
            return message;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}
