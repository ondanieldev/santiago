import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    OneToMany,
    OneToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Relationship from '@modules/relationships/infra/typeorm/entities/Relationship';
import Agreement from '@modules/agreements/infra/typeorm/entities/Agreement';

@Entity('persons')
export default class Person {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column('date')
    birth_date: Date;

    @Column()
    nacionality: string;

    @Column()
    civil_state: string;

    @Column()
    profission: string;

    @Column()
    cpf: string;

    @Column()
    rg: string;

    @Column()
    address_street: string;

    @Column()
    address_number: string;

    @Column()
    address_complement: string;

    @Column()
    address_neighborhood: string;

    @Column()
    address_city: string;

    @Column()
    address_cep: string;

    @Column()
    residencial_phone: string;

    @Column()
    commercial_phone: string;

    @Column()
    personal_phone: string;

    @Column()
    education_level: string;

    @Column()
    workplace: string;

    @Column('decimal')
    monthly_income: number;

    @Column('boolean')
    income_tax: boolean;

    @Column()
    cpf_photo: string;

    @Column()
    rg_photo: string;

    @Column()
    residencial_proof_photo: string;

    @Column()
    email: string;

    @Column()
    user_id: string;

    @OneToOne(() => User, user => user.person)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Relationship, relationship => relationship.person)
    relationships: Relationship[];

    @OneToMany(() => Agreement, agreement => agreement.contract)
    agreements: Agreement[];
}
