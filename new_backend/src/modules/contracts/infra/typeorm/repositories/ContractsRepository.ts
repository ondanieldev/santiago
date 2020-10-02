import { EntityRepository, Repository, getRepository } from 'typeorm';

import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import ICreateContractDTO from '@modules/contracts/dtos/ICreateContractDTO';
import IFindContractsDTO from '@modules/contracts/dtos/IFindContractsDTO';

interface IFindResponse {
    contracts: Contract[] | [];
    pagination: number;
}

@EntityRepository(Contract)
export default class ContractsRepository implements IContractsRepository {
    private ormRepository: Repository<Contract>;

    constructor() {
        this.ormRepository = getRepository(Contract);
    }

    public async find({
        limit,
        page,
        whereStatus,
    }: IFindContractsDTO): Promise<IFindResponse> {
        const contracts = await this.ormRepository.find({
            where: whereStatus,
            relations: ['student', 'grade'],
            take: limit,
            skip: page * limit - limit,
        });

        const pagination = await this.ormRepository.count({
            where: whereStatus,
        });

        return {
            contracts,
            pagination,
        };
    }

    public async findById(id: string): Promise<Contract | undefined> {
        const contract = await this.ormRepository.findOne({
            where: { id },
            relations: ['student', 'grade', 'agreements'],
        });

        return contract;
    }

    public async create(data: ICreateContractDTO): Promise<Contract> {
        const contract = this.ormRepository.create(data);

        await this.ormRepository.save(contract);

        return contract;
    }

    public async save(contract: Contract): Promise<Contract> {
        await this.ormRepository.save(contract);

        return contract;
    }
}
