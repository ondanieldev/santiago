import {
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
    Entity,
} from 'typeorm';

import Grade from '@modules/grades/infra/typeorm/entities/Grade';
import Student from '@modules/students/infra/typeorm/entities/Student';
import Agreement from '@modules/agreements/infra/typeorm/entities/Agreement';
import Debit from '@modules/debits/infra/typeorm/entities/Debit';

@Entity('contracts')
export default class Contract {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type: 'enum',
        enum: ['underAnalysis', 'pendent', 'accepted', 'active'],
    })
    status: 'underAnalysis' | 'pendent' | 'accepted' | 'active';

    @Column()
    comment: string;

    @Column()
    student_id: string;

    @Column()
    grade_id: string;

    @ManyToOne(() => Student, student => student.contracts)
    @JoinColumn({ name: 'student_id' })
    student: Student;

    @ManyToOne(() => Grade, grade => grade.contracts)
    @JoinColumn({ name: 'grade_id' })
    grade: Grade;

    @OneToMany(() => Agreement, agreement => agreement.contract)
    agreements: Agreement[];

    @OneToMany(() => Debit, debit => debit.contract)
    debits: Debit[];
}
