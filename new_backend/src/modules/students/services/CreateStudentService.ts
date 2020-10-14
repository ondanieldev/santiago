import { injectable, inject } from 'tsyringe';

import IStudentsRepository from '../repositories/IStudentsRepository';
import ICreateStudentDTO from '../dtos/ICreateStudentDTO';
import Student from '../infra/typeorm/entities/Student';

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
