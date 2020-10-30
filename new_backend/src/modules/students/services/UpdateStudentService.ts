import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Student from '../infra/typeorm/entities/Student';
import IUpdateStudentDTO from '../dtos/IUpdateStudentDTO';
import IStudentsRepository from '../repositories/IStudentsRepository';

@injectable()
export default class UpdateStudentService {
    constructor(
        @inject('StudentsRepository')
        private studentsRepository: IStudentsRepository,
    ) {}

    public async execute({ id, ...rest }: IUpdateStudentDTO): Promise<Student> {
        const student = await this.studentsRepository.findById(id);

        if (!student) {
            throw new AppError(
                'não é possível atualizar os dados de um aluno inexistente!',
            );
        }

        Object.assign(student, rest);

        await this.studentsRepository.save(student);

        return student;
    }
}
