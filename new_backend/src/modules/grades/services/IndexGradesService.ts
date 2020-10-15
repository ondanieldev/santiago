import { injectable, inject } from 'tsyringe';

import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import Grade from '@modules/grades/infra/typeorm/entities/Grade';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
export default class IndexGradesService {
    constructor(
        @inject('GradesRepository')
        private gradesRepository: IGradesRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(): Promise<Grade[] | []> {
        let grades = await this.cacheProvider.recovery<Grade[]>('grades');

        if (!grades) {
            grades = await this.gradesRepository.find();

            await this.cacheProvider.register('grades', grades);
        }

        return grades;
    }
}
