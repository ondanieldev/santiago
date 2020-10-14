import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Debit from '@modules/debits/infra/typeorm/entities/Debit';
import IDebitsRepository from '@modules/debits/repositories/IDebitsRepository';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';

@injectable()
export default class IndexDebitsByContractService {
    constructor(
        @inject('DebitsRepository')
        private debitsRepository: IDebitsRepository,

        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,
    ) {}

    public async execute(contract_id: string): Promise<Debit[] | []> {
        const contract = await this.contractsRepository.findById(contract_id);

        if (!contract) {
            throw new AppError(
                'Não é possível listar os débitos de um contrato inexistente!',
            );
        }

        if (contract.status !== 'accepted' && contract.status !== 'active') {
            throw new AppError(
                'Não é possível listar os débitos de um contrato que não foi aprovado!',
            );
        }

        const debits = await this.debitsRepository.findByContract(contract_id);

        return debits;
    }
}
