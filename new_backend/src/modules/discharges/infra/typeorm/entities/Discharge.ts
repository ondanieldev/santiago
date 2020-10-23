import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { Expose } from 'class-transformer';

import Payment from '@modules/payments/infra/typeorm/entities/Payment';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('discharges')
export default class Discharge {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    receipt: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    payment_id: string;

    @Column()
    user_id: string;

    @OneToOne(() => Payment, payment => payment.discharge)
    @JoinColumn({ name: 'payment_id' })
    payment: Payment;

    @ManyToOne(() => User, user => user.discharges)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Expose({ name: 'receipt_url' })
    getReceiptURL(): string | null {
        if (!this.receipt) {
            return null;
        }

        return `${process.env.APP_API_URL}/files/${this.receipt}`;
    }
}
