import { inject, injectable } from 'tsyringe';

import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';

@injectable()
export default class IndexAcceptedAndActiveContractsService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,
    ) {}

    public async execute(student_name: string): Promise<Contract[] | []> {
        const contracts = await this.contractsRepository.findByStudentName(
            student_name,
        );

        return contracts;
    }
}
