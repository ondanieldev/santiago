import { Repository, getRepository, EntityRepository } from 'typeorm';

import IStudentsrepository from '@modules/students/repositories/IStudentsRepository';
import Student from '@modules/students/infra/typeorm/entities/Student';
import ICreateStudentDTO from '@modules/students/dtos/ICreateStudentDTO';

@EntityRepository(Student)
export default class StudentsRepository implements IStudentsrepository {
    private ormRepository: Repository<Student>;

    constructor() {
        this.ormRepository = getRepository(Student);
    }

    public async findById(id: string): Promise<Student | undefined> {
        const student = await this.ormRepository.findOne({
            where: { id },
        });

        return student;
    }

    public async create(data: ICreateStudentDTO): Promise<Student> {
        const student = this.ormRepository.create(data);

        await this.ormRepository.save(student);

        return student;
    }

    public async save(data: Student): Promise<Student> {
        const student = await this.ormRepository.save(data);

        return student;
    }

    public async updateUser(
        student_id: string,
        user_id: string,
    ): Promise<Student | undefined> {
        const student = await this.ormRepository.findOne({
            where: { id: student_id },
        });

        if (student) {
            Object.assign(student, { user_id });

            await this.ormRepository.save(student);
        }

        return student;
    }
}
