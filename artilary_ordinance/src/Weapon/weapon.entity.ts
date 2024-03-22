import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Weapon_inventory } from './weapon_inventory.entity'; // Adjust the import path accordingly

@Entity()
export class Weapon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    name: string;

    @Column()
    type: string;
   
    @Column() 
    quantity: number;

    @Column()
    country: string;

    @Column({ nullable: true })
    description: string;
   
    @Column({ nullable: true })
    pdfFilePath: string;

    @OneToMany(() => Weapon_inventory, inventory => inventory.weapon)
    inventories: Weapon_inventory[];
}
