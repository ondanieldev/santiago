import ICreateGradeDTO from '@modules/grades/dtos/ICreateGradeDTO';
import Grade from '@modules/grades/infra/typeorm/entities/Grade';

export default interface IGradesRepository {
    find(): Promise<Grade[] | []>;
    findById(id: string): Promise<Grade | undefined>;
    findByNameAndYear(name: string, year: string): Promise<Grade | undefined>;
    create(data: ICreateGradeDTO): Promise<Grade>;
    save(data: Grade): Promise<Grade>;
}
