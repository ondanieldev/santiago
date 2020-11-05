import { injectable, inject } from 'tsyringe';

import Contract from '../infra/typeorm/entities/Contract';
import IContractsRepository from '../repositories/IContractsRepository';

@injectable()
class IndexActiveContractsByGradeIdService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,
    ) {}

    public async execute(grade_id: string): Promise<Contract[]> {
        let contracts = [] as Contract[];

        contracts = await this.contractsRepository.findActiveByGradeId(
            grade_id,
        );

        return contracts;
    }
}

export default IndexActiveContractsByGradeIdService;
