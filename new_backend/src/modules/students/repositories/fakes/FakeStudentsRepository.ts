import { v4 } from 'uuid';

import IStudentsrepository from '@modules/students/repositories/IStudentsRepository';
import Student from '@modules/students/infra/typeorm/entities/Student';
import ICreateStudentDTO from '@modules/students/dtos/ICreateStudentDTO';

export default class StudentsRepository implements IStudentsrepository {
    private students: Student[] = [];

    public async findById(id: string): Promise<Student | undefined> {
        const student = this.students.find(
            findStudent => findStudent.id === id,
        );

        return student;
    }

    public async create(data: ICreateStudentDTO): Promise<Student> {
        const student = new Student();

        Object.assign(student, { id: v4() }, data);

        this.students.push(student);

        return student;
    }

    public async save(data: Student): Promise<Student> {
        const student = this.students.find(
            findStudent => findStudent.id === data.id,
        );

        Object.assign(student, data);

        return data;
    }

    public async updateUser(
        student_id: string,
        user_id: string,
    ): Promise<Student | undefined> {
        const student = this.students.find(
            findStudent => findStudent.id === student_id,
        );

        Object.assign(student, { user_id });

        return student;
    }
}
