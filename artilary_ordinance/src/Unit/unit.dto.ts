import { IsString, Length, IsInt, IsEmail, Matches, IsNotEmpty } from 'class-validator';
import { IsOptionalPdf } from './PdfFileValidator';

export class Unit {
    id: number;

    @IsString()
    @Length(1, 100, { message: 'Name must be between 1 and 100 characters' })
    name: string;

    @IsInt()
    @IsNotEmpty({ message: 'Size must not be empty' })
    size: number;

    @IsInt()
    @IsNotEmpty({ message: 'Officers must not be empty' })
    officers: number;

    @IsEmail({}, { message: 'Email Address must be valid' })
    email: string;

    @IsString()
    @Length(6, 100, { message: 'Password must be at least 6 characters long' })
    @Matches(/.*[a-z].*/, { message: 'Password must contain at least one lowercase character' })
    password: string;

    @IsString()
    @Matches(/^0\d{10}$/, { message: 'Phone number must start with 0 and be 11 digits long' })
    phoneNumber: string;

    @IsOptionalPdf({ message: 'Uploaded file must be in PDF format' })
    uploadedFile: any = null;
}
