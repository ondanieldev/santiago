import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

@injectable()
export default class FindContractByIdService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,
    ) {}

    public async execute(id: string): Promise<Contract> {
        const contract = await this.contractsRepository.findById(id);

        if (!contract) {
            throw new AppError('a matrícula selecionada não existe!');
        }

        return contract;
    }
}
