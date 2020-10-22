import { injectable, inject } from 'tsyringe';

import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
export default class IndexUnderAnalysisAndPendentContractsService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(): Promise<Contract[] | []> {
        this.cacheProvider.invalidate('under-analysis-and-pendent-contracts');
        this.cacheProvider.invalidate('accepted-and-active-contracts');
        this.cacheProvider.invalidate('grades');
        this.cacheProvider.invalidate('undischarged-payments');
        this.cacheProvider.invalidate('profiles');
        this.cacheProvider.invalidate('users');

        let contracts = await this.cacheProvider.recovery<Contract[]>(
            'under-analysis-and-pendent-contracts',
        );

        if (!contracts) {
            contracts = await this.contractsRepository.findUnderAnalysisAndPendent();

            await this.cacheProvider.register(
                'under-analysis-and-pendent-contracts',
                contracts,
            );
        }

        return contracts;
    }
}
