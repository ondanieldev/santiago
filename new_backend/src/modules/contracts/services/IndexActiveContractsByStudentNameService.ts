import { injectable, inject } from 'tsyringe';

import IContractsRepository from '../repositories/IContractsRepository';
import Contract from '../infra/typeorm/entities/Contract';

@injectable()
class IndexActiveContractsByStudentNameService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,
    ) {}

    public async execute(student_name: string): Promise<Contract[]> {
        let contracts = [] as Contract[];

        const parsedName = student_name.toLowerCase();

        contracts = await this.contractsRepository.findActiveByStudentName(
            parsedName,
        );

        return contracts;
    }
}

export default IndexActiveContractsByStudentNameService;
