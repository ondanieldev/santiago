import { inject, injectable } from 'tsyringe';

import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class IndexAcceptedAndActiveContractsByGradeIdService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(grade_id: string): Promise<Contract[] | []> {
        // let contracts = await this.cacheProvider.recovery<Contract[]>(
        //     'accepted-and-active-contracts',
        // );

        let contracts;

        if (!contracts) {
            contracts = await this.contractsRepository.findAcceptedAndActiveByGradeId(
                grade_id,
            );

            // await this.cacheProvider.register(
            //     'accepted-and-active-contracts',
            //     contracts,
            // );
        }

        return contracts;
    }
}

export default IndexAcceptedAndActiveContractsByGradeIdService;
