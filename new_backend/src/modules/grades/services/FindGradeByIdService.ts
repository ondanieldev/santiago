import { injectable, inject } from 'tsyringe';

import Grade from '@modules/grades/infra/typeorm/entities/Grade';
import IGradesRepository from '@modules/grades/repositories/IGradesRepository';

@injectable()
export default class FindGradeByIdService {
    constructor(
        @inject('GradesRepository')
        private gradesRepository: IGradesRepository,
    ) {}

    public async execute(id: string): Promise<Grade | undefined> {
        const grade = await this.gradesRepository.findById(id);

        return grade;
    }
}
