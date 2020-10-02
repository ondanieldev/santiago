import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('profiles')
class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('boolean')
    new_enrollment_permiss: boolean;

    @Column('boolean')
    validate_enrollment_permiss: boolean;

    @Column('boolean')
    pay_debit_permiss: boolean;

    @Column('boolean')
    discharge_payment_permiss: boolean;

    @Column('boolean')
    crud_profiles_permiss: boolean;

    @Column('boolean')
    crud_users_permiss: boolean;

    @Column('boolean')
    crud_grades_permiss: boolean;

    @OneToMany(() => User, user => user.profile)
    users: User[];
}

export default Profile;
