import { injectable, inject } from 'tsyringe';
import { isPast } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import Debit from '../infra/typeorm/entities/Debit';
import ICreateDebitDTO from '../dtos/ICreateDebitDTO';
import IDebitsRepository from '../repositories/IDebitsRepository';

@injectable()
class CreateExtraDebitService {
    constructor(
        @inject('DebitsRepository')
        private debitsRepository: IDebitsRepository,

        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,
    ) {}

    public async execute({
        contract_id,
        description,
        payment_limit_date,
        value,
        discount,
        apply_interest_rules,
    }: ICreateDebitDTO): Promise<Debit> {
        const contract = await this.contractsRepository.findById(contract_id);

        if (!contract) {
            throw new AppError(
                'não é possível criar um débito para um contrato inexistente!',
            );
        }

        if (contract.status !== 'active') {
            throw new AppError(
                'não é possível criar um débito para um contrato que ainda não está ativo!',
            );
        }

        if (isPast(payment_limit_date)) {
            throw new AppError(
                'não é possível criar um débito com uma data limite que já passou!',
            );
        }

        if (discount && discount < 0) {
            throw new AppError(
                'não é possível criar um débito com um desconto negativo!',
            );
        }

        if (value < 0) {
            throw new AppError(
                'não é possível criar um débito com um valor negativo!',
            );
        }

        const debit = await this.debitsRepository.create({
            contract_id,
            description,
            payment_limit_date,
            value,
            discount,
            type: 'extra',
            apply_interest_rules,
        });

        return debit;
    }
}

export default CreateExtraDebitService;
