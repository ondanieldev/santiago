import ICreateStudentDTO from '@modules/students/dtos/ICreateStudentDTO';
import Student from '@modules/students/infra/typeorm/entities/Student';

export default interface IStudentsRepository {
    findById(id: string): Promise<Student | undefined>;
    create(data: ICreateStudentDTO): Promise<Student>;
    save(data: Student): Promise<Student>;
    updateUser(
        student_id: string,
        user_id: string,
    ): Promise<Student | undefined>;
    dangerouslyDelete(id: string): Promise<void>;
}
