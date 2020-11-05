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

    public async findUnderAnalysisAndPendentByGradeId(
        grade_id: string,
    ): Promise<Contract[] | []> {
        const contracts = this.ormRepository
            .createQueryBuilder('contract')
            .select(['contract.id', 'contract.status'])
            .addSelect('student.name')
            .addSelect(['grade.name', 'grade.year'])
            .leftJoin(
                'contract.student',
                'student',
                'student.id = contract.student_id',
            )
            .leftJoin('contract.grade', 'grade', 'grade.id = contract.grade_id')
            .where(
                "(contract.status = 'underAnalysis' or contract.status = 'pendent') and contract.grade_id = :grade_id",
                { grade_id },
            )
            .getMany();

        return contracts;
    }

    public async findAcceptedAndActiveByGradeId(
        grade_id: string,
    ): Promise<Contract[] | []> {
        const contracts = this.ormRepository
            .createQueryBuilder('contract')
            .select(['contract.id', 'contract.status'])
            .addSelect('student.name')
            .addSelect(['grade.name', 'grade.year'])
            .leftJoin(
                'contract.student',
                'student',
                'student.id = contract.student_id',
            )
            .leftJoin('contract.grade', 'grade', 'grade.id = contract.grade_id')
            .where(
                "(contract.status = 'accepted' or contract.status = 'active') and contract.grade_id = :grade_id",
                { grade_id },
            )
            .getMany();

        return contracts;
    }

    public async findById(id: string): Promise<Contract | undefined> {
        const contract = await this.ormRepository.findOne({
            where: { id },
            relations: ['student', 'grade', 'agreements', 'agreements.person'],
        });

        return contract;
    }

    public async findByStudentName(student_name: string): Promise<Contract[]> {
        const contracts = this.ormRepository
            .createQueryBuilder('contract')
            .select(['contract.id', 'contract.status'])
            .addSelect('student.name')
            .addSelect(['grade.name', 'grade.year'])
            .leftJoin(
                'contract.student',
                'student',
                'student.id = contract.student_id',
            )
            .leftJoin('contract.grade', 'grade', 'grade.id = contract.grade_id')
            .where(
                "(contract.status = 'accepted' or contract.status = 'active') and lower(student.name) like :student_name",
                { student_name: `%${student_name}%` },
            )
            .getMany();

        return contracts;
    }

    public async save(contract: Contract): Promise<Contract> {
        await this.ormRepository.save(contract);

        return contract;
    }

    public async dangerouslyDelete(id: string): Promise<void> {
        await this.ormRepository
            .createQueryBuilder()
            .delete()
            .where('id = :id', { id })
            .execute();
    }

    public async findByGradeId(grade_id: string): Promise<Contract[]> {
        const contracts = await this.ormRepository.find({
            where: {
                grade: { id: grade_id },
            },
        });

        return contracts;
    }

    public async findActiveByGradeId(grade_id: string): Promise<Contract[]> {
        const contracts = this.ormRepository
            .createQueryBuilder('contract')
            .select(['contract.id', 'contract.status'])
            .addSelect('student.name')
            .addSelect(['grade.name', 'grade.year'])
            .leftJoin(
                'contract.student',
                'student',
                'student.id = contract.student_id',
            )
            .leftJoin('contract.grade', 'grade', 'grade.id = contract.grade_id')
            .where("contract.status = 'active' and grade.id = :grade_id", {
                grade_id,
            })
            .getMany();

        return contracts;
    }

    public async findActiveByStudentName(
        student_name: string,
    ): Promise<Contract[]> {
        const contracts = this.ormRepository
            .createQueryBuilder('contract')
            .select(['contract.id', 'contract.status'])
            .addSelect('student.name')
            .addSelect(['grade.name', 'grade.year'])
            .leftJoin(
                'contract.student',
                'student',
                'student.id = contract.student_id',
            )
            .leftJoin('contract.grade', 'grade', 'grade.id = contract.grade_id')
            .where(
                "contract.status = 'active' and lower(student.name) like :student_name",
                { student_name: `%${student_name}%` },
            )
            .getMany();

        return contracts;
    }
}
