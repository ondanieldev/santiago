import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import IContractsRepository from '../repositories/IContractsRepository';
import ICreateContractDTO from '../dtos/ICreateContractDTO';
import Contract from '../infra/typeorm/entities/Contract';

@injectable()
export default class CreateEnrollmentService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,

        @inject('StudentsRepository')
        private studentsRepository: IStudentsRepository,

        @inject('GradesRepository')
        private gradesRepository: IGradesRepository,
    ) {}

    public async execute({
        student_id,
        grade_id,
    }: ICreateContractDTO): Promise<Contract> {
        const checkIfStudentExists = await this.studentsRepository.findById(
            student_id,
        );

        if (!checkIfStudentExists) {
            throw new AppError(
                'Não é possível criar uma matrícula sem um aluno!',
            );
        }

        const checkIfGradeExists = await this.gradesRepository.findById(
            grade_id,
        );

        if (!checkIfGradeExists) {
            throw new AppError(
                'Não é possível matrícular um aluno em uma turma inexistente!',
            );
        }

        const contract = await this.contractsRepository.create({
            grade_id,
            student_id,
        });

        return contract;
    }
}
