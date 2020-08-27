import ICreateGradeDTO from '@modules/grades/dtos/ICreateGradeDTO';
import Grade from '@modules/grades/infra/typeorm/entities/Grade';

export default interface IGradesRepository {
    findById(id: string): Promise<Grade | undefined>;
    create(data: ICreateGradeDTO): Promise<Grade>;
}
