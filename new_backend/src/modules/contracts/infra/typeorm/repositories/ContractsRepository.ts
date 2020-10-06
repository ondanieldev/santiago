import { EntityRepository, Repository, getRepository } from 'typeorm';

import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import ICreateContractDTO from '@modules/contracts/dtos/ICreateContractDTO';

@EntityRepository(Contract)
export default class ContractsRepository implements IContractsRepository {
    private ormRepository: Repository<Contract>;

    constructor() {
        this.ormRepository = getRepository(Contract);
    }

    public async create(data: ICreateContractDTO): Promise<Contract> {
        const contract = this.ormRepository.create(data);

        await this.ormRepository.save(contract);

        return contract;
    }

    public async findUnderAnalysisAndPendent(): Promise<Contract[] | []> {
        const contracts = this.ormRepository.find({
            where: [{ status: 'underAnalysis' }, { status: 'pendent' }],
        });

        return contracts;
    }

    public async findById(id: string): Promise<Contract | undefined> {
        const contract = await this.ormRepository.findOne({
            where: { id },
            relations: ['student', 'grade', 'agreements'],
        });

        return contract;
    }

    public async save(contract: Contract): Promise<Contract> {
        await this.ormRepository.save(contract);

        return contract;
    }
}
