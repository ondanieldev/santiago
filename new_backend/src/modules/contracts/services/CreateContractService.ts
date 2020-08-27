import { injectable, inject } from 'tsyringe';

import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import ICreateContractDTO from '@modules/contracts/dtos/ICreateContractDTO';
import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

@injectable()
export default class CreateContractService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,
    ) {}

    public async execute(data: ICreateContractDTO): Promise<Contract> {
        const contract = this.contractsRepository.create(data);

        return contract;
    }
}
