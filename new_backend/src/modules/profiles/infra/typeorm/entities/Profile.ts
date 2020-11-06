import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('profiles')
class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('boolean')
    create_new_enrollments_permiss: boolean;

    @Column('boolean')
    validate_enrollments_permiss: boolean;

    @Column('boolean')
    create_extra_debits_permiss: boolean;

    @Column('boolean')
    pay_debits_permiss: boolean;

    @Column('boolean')
    discharge_payments_permiss: boolean;

    @Column('boolean')
    crud_profiles_permiss: boolean;

    @Column('boolean')
    crud_users_permiss: boolean;

    @Column('boolean')
    crud_grades_permiss: boolean;

    @Column('boolean')
    crud_extra_debits_permiss: boolean;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => User, user => user.profile)
    users: User[];
}

export default Profile;
