import { injectable, inject } from 'tsyringe';

import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class IndexUnderAnalysisAndPendentContractsByGradeService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(grade_id: string): Promise<Contract[] | []> {
        let contracts = await this.cacheProvider.recovery<Contract[]>(
            `under-analysis-and-pendent-contracts:${grade_id}`,
        );

        if (!contracts) {
            contracts = await this.contractsRepository.findUnderAnalysisAndPendentByGradeId(
                grade_id,
            );

            await this.cacheProvider.register(
                `under-analysis-and-pendent-contracts:${grade_id}`,
                contracts,
            );
        }

        return contracts;
    }
}

export default IndexUnderAnalysisAndPendentContractsByGradeService;
