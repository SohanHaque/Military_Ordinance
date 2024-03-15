import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import * as multer from 'multer';
import * as path from 'path';

export function IsOptionalPdf(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isOptionalPdf',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                async validate(value: any, args: ValidationArguments) {
                    if (!value) {
                        return true; // Accept null value for uploadFile
                    }

                    const [,, validationArguments] = args.constraints; // Destructure to get validationArguments
                    const req = validationArguments?.object; // Get request object from validationArguments

                    if (!req?.file) {
                        return true; // No file uploaded, so validation passes
                    }

                    try {
                        await new Promise<void>((resolve, reject) => {
                            const upload = multer({ dest: 'uploads/' }).single(propertyName);
                            upload(req, {}, async function (err: any) {
                                if (err) {
                                    return reject(false);
                                }
                                const fileExtension = path.extname(req.file.originalname).toLowerCase();
                                if (fileExtension !== '.pdf') {
                                    return reject(false);
                                }
                                resolve();
                            });
                        });
                        return true;
                    } catch (error) {
                        return false; // Validation fails if an error occurs during file upload
                    }
                },
            },
        });
    };
}
