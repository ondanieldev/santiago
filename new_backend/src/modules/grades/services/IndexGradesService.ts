import { injectable, inject } from 'tsyringe';

import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import Grade from '@modules/grades/infra/typeorm/entities/Grade';

@injectable()
export default class IndexGradesService {
    constructor(
        @inject('GradesRepository')
        private gradesRepository: IGradesRepository,
    ) {}

    public async execute(): Promise<Grade[] | []> {
        const grades = await this.gradesRepository.find();

        return grades;
    }
}
