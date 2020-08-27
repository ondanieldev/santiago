import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

@Entity('grades')
export default class Grade {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    year: string;

    @Column('decimal')
    value: number;

    @OneToMany(() => Contract, contract => contract.grade)
    contracts: Contract[];
}
