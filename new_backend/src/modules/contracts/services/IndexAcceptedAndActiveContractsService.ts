import { inject, injectable } from 'tsyringe';

import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
export default class IndexAcceptedAndActiveContractsService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(): Promise<Contract[] | []> {
        let contracts = await this.cacheProvider.recovery<Contract[]>(
            'accepted-and-active-contracts',
        );

        if (!contracts) {
            contracts = await this.contractsRepository.findAcceptedAndActive();

            await this.cacheProvider.register(
                'accepted-and-active-contracts',
                contracts,
            );
        }

        return contracts;
    }
}
