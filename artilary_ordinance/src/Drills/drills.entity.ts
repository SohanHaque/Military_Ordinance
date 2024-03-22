// drills.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Drills {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    date: Date;

    @Column({ default: 'requested' })
    status: string;

    @Column({ nullable: true })
    designatedTo: string; // Assuming designatedTo is a string, change as needed

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
}
