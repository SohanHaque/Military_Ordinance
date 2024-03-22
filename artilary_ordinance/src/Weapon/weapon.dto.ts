import { IsString, Length, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class WeaponDto {
    @IsString()
    @Length(1, 100, { message: 'Name must be between 1 and 100 characters' })
    readonly name: string;

    @IsString()
    @IsNotEmpty({ message: 'Type must not be empty' })
    readonly type: string;

    @IsInt()
    @Min(0)
    quantity: number;

    @IsString()
    @IsNotEmpty({ message: 'Country must not be empty' })
    readonly country: string;

    @IsString()
    @IsOptional()
    readonly description?: string;
}
