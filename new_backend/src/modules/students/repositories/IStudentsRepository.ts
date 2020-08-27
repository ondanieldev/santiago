import ICreateStudentDTO from '@modules/students/dtos/ICreateStudentDTO';
import Student from '@modules/students/infra/typeorm/entities/Student';

export default interface IStudentsRepository {
    findById(id: string): Promise<Student | undefined>;
    create(data: ICreateStudentDTO): Promise<Student>;
    save(data: Student): Promise<Student>;
}
