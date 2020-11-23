import { injectable, inject } from 'tsyringe';

import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import AppError from '@shared/errors/AppError';
import IContractsRepository from '../repositories/IContractsRepository';
import Contract from '../infra/typeorm/entities/Contract';

@injectable()
class IndexAcceptedAndActiveContractsByStudentNameService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,

        @inject('GradesRepository')
        private gradesRepository: IGradesRepository,
    ) {}

    public async execute(
        student_name: string,
        grade_id: string,
    ): Promise<Contract[]> {
        let contracts = [] as Contract[];

        const grade = await this.gradesRepository.findById(grade_id);

        if (!grade) {
            throw new AppError('essa turma não existe!');
        }

        const parsedName = student_name.toLowerCase();

        contracts = await this.contractsRepository.findAcceptedAndActiveByStudentName(
            parsedName,
            grade_id,
        );

        return contracts;
    }
}

export default IndexAcceptedAndActiveContractsByStudentNameService;
