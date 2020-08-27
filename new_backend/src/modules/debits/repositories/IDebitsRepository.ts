import Debit from '@modules/debits/infra/typeorm/entities/Debit';
import ICreateDebitDTO from '@modules/debits/dtos/ICreateDebitDTO';

export default interface IDebitsRepository {
    findById(id: string): Promise<Debit | undefined>;
    findUnpaidByContract(contract_id: string): Promise<Debit[] | []>;
    create(data: ICreateDebitDTO): Promise<Debit>;
    save(debit: Debit): Promise<Debit>;
}
