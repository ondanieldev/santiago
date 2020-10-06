import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Student from '../infra/typeorm/entities/Student';
import IStudentsRepository from '../repositories/IStudentsRepository';

@injectable()
export default class CreateEnrollmentService {
    constructor(
        @inject('StudentsRepository')
        private studentsRepository: IStudentsRepository,
    ) {}

    public async execute({ id, ...rest }: Student): Promise<Student> {
        const student = await this.studentsRepository.findById(id);

        if (!student) {
            throw new AppError(
                'Não é possível atualizar os dados de um aluno inexistente!',
            );
        }

        Object.assign(student, rest);

        return student;
    }
}
