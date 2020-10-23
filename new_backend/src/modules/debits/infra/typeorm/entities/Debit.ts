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
    initial_date: Date;

    @Column('date')
    final_date: Date;

    @Column('date')
    payday: Date;

    @Column({
        type: 'enum',
        enum: ['enrollment', 'installment'],
    })
    type: 'enrollment' | 'installment';

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
