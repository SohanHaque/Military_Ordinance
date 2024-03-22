// drills.dto.ts
import { IsNotEmpty, IsOptional } from 'class-validator';

export class DrillsDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    description: string;

    @IsOptional()
    date: Date;

    @IsOptional()
    designatedTo: string;
}
