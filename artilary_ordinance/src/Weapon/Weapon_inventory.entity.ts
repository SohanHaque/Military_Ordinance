import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Weapon } from './weapon.entity';
import { Unit } from '../Unit/unit.entity';


@Entity()
export class Weapon_inventory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    count: number;
    
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    requestTime: Date;

    @Column({ nullable: true })
    receiveTime: Date;

    @Column({ default: 'not approved' })
    approvedBy: string;

    @Column({ default: 'requested' })
    status: string;
    
   
    @Column() 
    unit_id: number;

    @ManyToOne(() => Weapon, weapon => weapon.inventories)
    @JoinColumn({ name: 'weapon_id' })
    weapon: Weapon;

    // @ManyToOne(() => Unit, unit => unit.inventories)
    // @JoinColumn({ name: 'unit_id' })
    // unit: Unit;
}
