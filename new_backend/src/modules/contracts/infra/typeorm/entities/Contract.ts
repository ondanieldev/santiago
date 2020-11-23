import {
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
    Entity,
    CreateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

import Grade from '@modules/grades/infra/typeorm/entities/Grade';
import Student from '@modules/students/infra/typeorm/entities/Student';
import Agreement from '@modules/agreements/infra/typeorm/entities/Agreement';
import Debit from '@modules/debits/infra/typeorm/entities/Debit';
import uploadConfig from '@config/upload';

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

    @CreateDateColumn()
    created_at: Date;

    @Column()
    student_id: string;

    @Column()
    grade_id: string;

    @Column('decimal')
    discount: number;

    @Column()
    checklist_document: string;

    @Column()
    enrollment_form_document: string;

    @Column()
    contract_document: string;

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

    @Expose({ name: 'contract_document' })
    getContractDocumentURL(): string | null {
        if (!this.contract_document) {
            return null;
        }

        switch (uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.contract_document}`;
            case 's3':
                return `${uploadConfig.config.s3.baseURL}/${this.contract_document}`;
            default:
                return null;
        }
    }

    @Expose({ name: 'enrollment_form_document' })
    getEnrollmentFormDocumentURL(): string | null {
        if (!this.enrollment_form_document) {
            return null;
        }

        switch (uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.enrollment_form_document}`;
            case 's3':
                return `${uploadConfig.config.s3.baseURL}/${this.enrollment_form_document}`;
            default:
                return null;
        }
    }

    @Expose({ name: 'checklist_document' })
    getChecklistDocumentURL(): string | null {
        if (!this.checklist_document) {
            return null;
        }

        switch (uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.checklist_document}`;
            case 's3':
                return `${uploadConfig.config.s3.baseURL}/${this.checklist_document}`;
            default:
                return null;
        }
    }
}
