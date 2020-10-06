import { v4 } from 'uuid';

import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import ICreateContractDTO from '@modules/contracts/dtos/ICreateContractDTO';

export default class FakeContractsRepository implements IContractsRepository {
    private contracts: Contract[] = [];

    public async create(data: ICreateContractDTO): Promise<Contract> {
        const contract = new Contract();

        Object.assign(
            contract,
            { id: v4(), status: 'underAnalysis', agreements: [] },
            data,
        );

        this.contracts.push(contract);

        return contract;
    }

    public async findUnderAnalysisAndPendent(): Promise<Contract[] | []> {
        const contracts = this.contracts.filter(
            findContract =>
                findContract.status === 'underAnalysis' ||
                findContract.status === 'pendent',
        );

        return contracts;
    }

    public async findById(id: string): Promise<Contract | undefined> {
        const contract = this.contracts.find(
            findContract => findContract.id === id,
        );

        return contract;
    }

    public async save(data: Contract): Promise<Contract> {
        const contract = this.contracts.find(
            findContract => findContract.id === data.id,
        );

        Object.assign(contract, data);

        return data;
    }
}
