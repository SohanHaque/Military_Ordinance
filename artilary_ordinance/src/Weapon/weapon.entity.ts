import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Weapon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    name: string;

    @Column()
    type: string;


    @Column()
    country: string;

    @Column({ nullable: true })
    description: string;

}
