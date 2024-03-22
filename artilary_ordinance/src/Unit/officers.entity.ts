// officers.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Unit } from './unit.entity'; // Adjust the import path accordingly

@Entity()
export class Officers {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    rank: string;

    @OneToOne(() => Unit, unit => unit.officeres)
    @JoinColumn({ name: 'unit_id' })
    unit: Unit;
   
}
