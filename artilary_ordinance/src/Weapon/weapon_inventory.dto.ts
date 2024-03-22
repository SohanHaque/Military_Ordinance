import { IsNotEmpty, IsNumber, IsDateString, IsString } from 'class-validator';

export class WeaponInventoryDTO {
    @IsNotEmpty()
    count: number;
    @IsNotEmpty()
    @IsNumber()
    unit_id: number;
   
    @IsNotEmpty()
    @IsNumber()
    weapon_id: number;
}
