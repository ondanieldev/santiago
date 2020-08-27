import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import { injectable, inject } from 'tsyringe';

import ICreateGradeDTO from '@modules/grades/dtos/ICreateGradeDTO';
import Grade from '@modules/grades/infra/typeorm/entities/Grade';

@injectable()
export default class CreateGradeService {
    constructor(
        @inject('GradesRepository')
        private gradesRepository: IGradesRepository,
    ) {}

    public async execute(data: ICreateGradeDTO): Promise<Grade> {
        const grade = await this.gradesRepository.create(data);

        return grade;
    }
}
