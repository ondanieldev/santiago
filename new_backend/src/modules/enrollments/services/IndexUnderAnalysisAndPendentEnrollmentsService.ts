import { injectable, inject } from 'tsyringe';

import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';

@injectable()
export default class IndexUnderAnalysisAndPendentEnrollmentsService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,
    ) {}

    public async execute(): Promise<Contract[] | []> {
        const contracts = await this.contractsRepository.findUnderAnalysisAndPendent();

        return contracts;
    }
}
