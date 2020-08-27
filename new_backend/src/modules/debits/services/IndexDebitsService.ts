import { injectable, inject } from 'tsyringe';

import IDebitsRepository from '@modules/debits/repositories/IDebitsRepository';
import Debit from '../infra/typeorm/entities/Debit';

@injectable()
export default class IndexDebitsService {
    constructor(
        @inject('DebitsRepository')
        private debitsRepository: IDebitsRepository,
    ) {}

    public async execute(contract_id: string): Promise<Debit[] | []> {
        const debits = await this.debitsRepository.findUnpaidByContract(
            contract_id,
        );

        return debits;
    }
}
