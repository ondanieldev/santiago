import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    OneToOne,
    OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Relationship from '@modules/relationships/infra/typeorm/entities/Relationship';
import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

@Entity('students')
export default class Student {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    father_name: string;

    @Column()
    mother_name: string;

    @Column('date')
    birth_date: Date;

    @Column()
    nacionality: string;

    @Column()
    birth_city: string;

    @Column()
    birth_state: string;

    @Column({
        type: 'enum',
        enum: ['male', 'female'],
    })
    gender: 'male' | 'female';

    @Column({
        type: 'enum',
        enum: ['white', 'brown', 'black', 'indigenous', 'yellow'],
    })
    race: 'white' | 'brown' | 'black' | 'indigenous' | 'yellow';

    @Column('boolean')
    ease_relating: boolean;

    @Column()
    origin_school: string;

    @Column()
    health_plan: string;

    @Column()
    food_alergy: string;

    @Column()
    medication_alergy: string;

    @Column()
    health_problem: string;

    @Column()
    special_necessities: string;

    @Column()
    birth_certificate_photo: string;

    @Column()
    vaccine_card_photo: string;

    @Column()
    health_plan_photo: string;

    @Column()
    transfer_declaration_photo: string;

    @Column()
    monthly_declaration_photo: string;

    @Column()
    school_records_photo: string;

    @Column()
    user_id: string;

    @OneToOne(() => User, user => user.student)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Relationship, relationship => relationship.student)
    relationships: Relationship[];

    @OneToMany(() => Contract, contract => contract.grade)
    contracts: Contract[];
}
