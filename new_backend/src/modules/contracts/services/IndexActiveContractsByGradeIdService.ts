import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { injectable, inject } from 'tsyringe';

import Contract from '../infra/typeorm/entities/Contract';
import IContractsRepository from '../repositories/IContractsRepository';

@injectable()
class IndexActiveContractsByGradeIdService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(grade_id: string): Promise<Contract[]> {
        let contracts = await this.cacheProvider.recovery<Contract[]>(
            `active-contracts:${grade_id}`,
        );

        if (!contracts) {
            contracts = await this.contractsRepository.findActiveByGradeId(
                grade_id,
            );

            await this.cacheProvider.register(
                `active-contracts:${grade_id}`,
                contracts,
            );
        }

        return contracts;
    }
}

export default IndexActiveContractsByGradeIdService;
