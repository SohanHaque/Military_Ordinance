// unit.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Officers } from './officers.entity';
import { Weapon_inventory } from '../Weapon/weapon_inventory.entity';

@Entity()
export class Unit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column()
    size: number;


    @Column({ unique: true }) 
    email: string;

    @Column()
    password: string;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true })
    uploadedFile: string;

    @OneToOne(() => Officers, officer => officer.unit)
    officeres: Officers[];
}
