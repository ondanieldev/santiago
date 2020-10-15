import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import Profile from '@modules/profiles/infra/typeorm/entities/Profile';
import Person from '@modules/persons/infra/typeorm/entities/Person';
import Student from '@modules/students/infra/typeorm/entities/Student';
import Payment from '@modules/payments/infra/typeorm/entities/Payment';
import Discharge from '@modules/discharges/infra/typeorm/entities/Discharge';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    profile_id: string;

    @ManyToOne(() => Profile, profile => profile.users)
    @JoinColumn({ name: 'profile_id' })
    profile: Profile;

    @OneToOne(() => Person, person => person.user)
    person: Person;

    @OneToOne(() => Student, student => student.user)
    student: Student;

    @OneToMany(() => Payment, payment => payment.user)
    payments: Payment[];

    @OneToMany(() => Discharge, discharge => discharge.user)
    discharges: Discharge[];
}

export default User;
