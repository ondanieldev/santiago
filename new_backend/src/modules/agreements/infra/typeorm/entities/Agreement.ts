import {
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Entity,
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
