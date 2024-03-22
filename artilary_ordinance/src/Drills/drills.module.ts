import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drills } from './drills.entity'; // Assuming you have a Drills entity
import { DrillsController } from './drills.controller'; // Create a DrillsController
import { DrillsService } from './drills.service'; // Create a DrillsService

@Module({
  imports: [
    TypeOrmModule.forFeature([Drills]), // Import the Drills entity
  ],
  controllers: [DrillsController], // Include the DrillsController
  providers: [
    DrillsService, // Include the DrillsService
    {
      provide: 'APP_PIPE',
      useClass: ValidationPipe,
    },
  ],
})
export class DrillsModule {}
