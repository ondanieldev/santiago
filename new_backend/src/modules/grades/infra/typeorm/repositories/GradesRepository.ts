import { Repository, getRepository, EntityRepository } from 'typeorm';

import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import Grade from '@modules/grades/infra/typeorm/entities/Grade';
import ICreateGradeDTO from '@modules/grades/dtos/ICreateGradeDTO';

@EntityRepository(Grade)
export default class GradesRepository implements IGradesRepository {
    private ormRepository: Repository<Grade>;

    constructor() {
        this.ormRepository = getRepository(Grade);
    }

    public async findById(id: string): Promise<Grade | undefined> {
        const grade = await this.ormRepository.findOne({
            where: { id },
        });

        return grade;
    }

    public async create(data: ICreateGradeDTO): Promise<Grade> {
        const grade = this.ormRepository.create(data);

        await this.ormRepository.save(grade);

        return grade;
    }
}
