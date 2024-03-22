import { IsNotEmpty, IsString } from 'class-validator';

export class OfficersDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    rank: string;

    @IsNotEmpty()
    unit_Id: number;
}
