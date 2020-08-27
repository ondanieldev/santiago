import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';

interface IRequest {
    id: string;
    status: 'pendent' | 'accepted';
    comment: string;
}

@injectable()
export default class AprooveOrDisaprooveEnrollmentService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,
    ) {}

    public async execute({ id, status, comment }: IRequest): Promise<void> {
        const contract = await this.contractsRepository.findById(id);

        if (!contract) {
            throw new AppError('This contract does not exists!');
        }

        contract.status = status;
        contract.comment = comment;

        await this.contractsRepository.save(contract);
    }
}
