import {
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Entity,
    CreateDateColumn,
} from 'typeorm';

import Person from '@modules/persons/infra/typeorm/entities/Person';
import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

@Entity('agreements')
export default class Agreement {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type: 'enum',
        enum: ['financial', 'supportive', 'educational'],
    })
    responsible_type: 'financial' | 'supportive' | 'educational';

    @CreateDateColumn()
    created_at: Date;

    @Column()
    person_id: string;

    @Column()
    contract_id: string;

    @ManyToOne(() => Person, person => person.agreements)
    @JoinColumn({ name: 'person_id' })
    person: Person;

    @ManyToOne(() => Contract, contract => contract.agreements)
    @JoinColumn({ name: 'contract_id' })
    contract: Contract;
}
