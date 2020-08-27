import { injectable, inject } from 'tsyringe';

import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

@injectable()
export default class IndexEnrollmentsService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,
    ) {}

    public async execute(): Promise<Contract[] | []> {
        const contracts = await this.contractsRepository.find();

        return contracts;
    }
}
