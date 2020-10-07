import { v4 } from 'uuid';

import Debit from '@modules/debits/infra/typeorm/entities/Debit';
import IDebitsRepository from '@modules/debits/repositories/IDebitsRepository';
import ICreateDebitDTO from '@modules/debits/dtos/ICreateDebitDTO';

export default class DebitsRepository implements IDebitsRepository {
    private debits: Debit[] = [];

    public async findById(id: string): Promise<Debit | undefined> {
        const debit = this.debits.find(findDebit => findDebit.id === id);

        return debit;
    }

    public async findByContract(contract_id: string): Promise<Debit[] | []> {
        const debits = this.debits.filter(
            debit => debit.contract_id === contract_id,
        );

        return debits;
    }

    public async create(data: ICreateDebitDTO): Promise<Debit> {
        const debit = new Debit();

        Object.assign(debit, data, { id: v4() });

        this.debits.push(debit);

        return debit;
    }

    public async save(data: Debit): Promise<Debit> {
        const debit = this.debits.find(findDebit => findDebit.id === data.id);

        Object.assign(data, debit);

        return data;
    }
}
