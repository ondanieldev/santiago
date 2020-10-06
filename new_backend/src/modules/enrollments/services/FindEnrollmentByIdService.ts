import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import IAgreementsRepository from '@modules/agreements/repositories/IAgreementsRepository';
import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

@injectable()
export default class FindEnrollmentByIdService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,

        @inject('AgreementsRepository')
        private agreementsRepository: IAgreementsRepository,
    ) {}

    public async execute(id: string): Promise<Contract> {
        const contract = await this.contractsRepository.findById(id);

        if (!contract) {
            throw new AppError('Essa matrícula não existe!');
        }

        return contract;
    }
}
