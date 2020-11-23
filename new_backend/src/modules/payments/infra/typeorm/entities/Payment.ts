import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

import Debit from '@modules/debits/infra/typeorm/entities/Debit';
import User from '@modules/users/infra/typeorm/entities/User';
import Discharge from '@modules/discharges/infra/typeorm/entities/Discharge';
import uploadConfig from '@config/upload';

@Entity('payments')
export default class Payment {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type: 'enum',
        enum: ['creditCard', 'debitCard', 'cash', 'check', 'deposit', 'slip'],
    })
    method: 'creditCard' | 'debitCard' | 'cash' | 'check' | 'deposit' | 'slip';

    @Column('decimal')
    amount: number;

    @Column('boolean')
    discharged: boolean;

    @Column()
    receipt: string;

    @Column('date')
    discharge_day: Date;

    @Column()
    debit_id: string;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToOne(() => Debit, debit => debit.payment)
    @JoinColumn({ name: 'debit_id' })
    debit: Debit;

    @ManyToOne(() => User, user => user.payments)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToOne(() => Discharge, discharge => discharge.payment)
    discharge: Discharge;

    @Expose({ name: 'receipt_url' })
    getReceiptURL(): string | null {
        if (!this.receipt) {
            return null;
        }

        switch (uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.receipt}`;
            case 's3':
                return `${uploadConfig.config.s3.baseURL}/${this.receipt}`;
            default:
                return null;
        }
    }
}
