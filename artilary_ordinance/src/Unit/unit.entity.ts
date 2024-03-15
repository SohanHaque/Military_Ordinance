import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

@Entity()
export class Unit {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    name: string;

    @Column()
    size: number;

    @Column()
    officers: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true })
    uploadedFile: string;

    @BeforeInsert()
    generateId() {
        this.id = this.id * 100 + 24;
    }
}