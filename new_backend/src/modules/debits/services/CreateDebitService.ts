import { injectable, inject } from 'tsyringe';
import { startOfDay, endOfDay } from 'date-fns';

import Debit from '@modules/debits/infra/typeorm/entities/Debit';
import IDebitsRepository from '@modules/debits/repositories/IDebitsRepository';
import ICreateDebitDTO from '@modules/debits/dtos/ICreateDebitDTO';

@injectable()
export default class CreateDebitService {
    constructor(
        @inject('DebitsRepository')
        private debitsRepository: IDebitsRepository,
    ) {}

    public async execute({
        contract_id,
        description,
        final_date,
        initial_date,
        value,
    }: ICreateDebitDTO): Promise<Debit> {
        const debitInitialDate = startOfDay(initial_date);
        const debitFinalDate = endOfDay(final_date);

        const debit = await this.debitsRepository.create({
            contract_id,
            description,
            final_date: debitFinalDate,
            initial_date: debitInitialDate,
            value,
        });

        return debit;
    }
}
