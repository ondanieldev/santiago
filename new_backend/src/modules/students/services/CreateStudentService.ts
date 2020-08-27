import { injectable, inject } from 'tsyringe';

import ICreateStudentDTO from '@modules/students/dtos/ICreateStudentDTO';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import Student from '@modules/students/infra/typeorm/entities/Student';

@injectable()
export default class CreateStudentService {
    constructor(
        @inject('StudentsRepository')
        private studentsRepository: IStudentsRepository,
    ) {}

    public async execute(data: ICreateStudentDTO): Promise<Student> {
        const student = await this.studentsRepository.create(data);

        return student;
    }
}
