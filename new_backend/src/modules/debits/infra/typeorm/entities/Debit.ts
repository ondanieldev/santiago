import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToOne,
    CreateDateColumn,
} from 'typeorm';

import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import Payment from '@modules/payments/infra/typeorm/entities/Payment';

@Entity('debits')
export default class Debit {
    @PrimaryGeneratedColumn()
    id: string;

    @Column('decimal')
    value: number;

    @Column('boolean')
    paid: boolean;

    @Column()
    description: string;

    @Column('date')
    payment_limit_date: Date;

    @Column('decimal')
    discount: number;

    @Column('date')
    payday: Date;

    @Column('boolean')
    apply_interest_rules: boolean;

    @Column({
        type: 'enum',
        enum: ['enrollment', 'installment', 'extra'],
    })
    type: 'enrollment' | 'installment' | 'extra';

    @CreateDateColumn()
    created_at: Date;

    @Column()
    contract_id: string;

    @ManyToOne(() => Contract, contract => contract.debits)
    @JoinColumn({ name: 'contract_id' })
    contract: Contract;

    @OneToOne(() => Payment, payment => payment.debit)
    payment: Payment;
}
