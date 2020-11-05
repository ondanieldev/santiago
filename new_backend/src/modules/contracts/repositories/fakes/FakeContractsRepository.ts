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
            {
                id: v4(),
                status: 'underAnalysis',
                agreements: [],
                grade: {},
                student: {},
            },
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

    public async findAcceptedAndActive(): Promise<Contract[] | []> {
        const contracts = this.contracts.filter(
            findContract =>
                findContract.status === 'accepted' ||
                findContract.status === 'active',
        );

        return contracts;
    }

    public async findById(id: string): Promise<Contract | undefined> {
        const contract = this.contracts.find(
            findContract => findContract.id === id,
        );

        return contract;
    }

    public async findByStudentName(student_name: string): Promise<Contract[]> {
        const contracts = this.contracts.filter(contract => {
            if (contract.student.name) {
                return contract.student.name.includes(student_name);
            }

            return false;
        });

        return contracts;
    }

    public async save(data: Contract): Promise<Contract> {
        const contract = this.contracts.find(
            findContract => findContract.id === data.id,
        );

        Object.assign(contract, data);

        return data;
    }

    public async dangerouslyDelete(id: string): Promise<void> {
        this.contracts = this.contracts.filter(contract => contract.id !== id);
    }

    public async findByGradeId(grade_id: string): Promise<Contract[]> {
        return this.contracts.filter(
            contract => contract.grade.id === grade_id,
        );
    }

    public async findActiveByGradeId(grade_id: string): Promise<Contract[]> {
        return this.contracts.filter(
            contract =>
                contract.status === 'active' && contract.grade.id === grade_id,
        );
    }

    public async findActiveByStudentName(
        student_name: string,
    ): Promise<Contract[]> {
        return this.contracts.filter(
            contract =>
                contract.status === 'active' &&
                contract.student.name &&
                contract.student.name.includes(student_name),
        );
    }
}
