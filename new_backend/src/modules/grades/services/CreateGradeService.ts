import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Grade from '@modules/grades/infra/typeorm/entities/Grade';
import ICreateGradeDTO from '@modules/grades/dtos/ICreateGradeDTO';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
export default class CreateGradeService {
    constructor(
        @inject('GradesRepository')
        private gradesRepository: IGradesRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        name,
        value,
        year,
    }: ICreateGradeDTO): Promise<Grade> {
        const gradeWithTheSameNameAndYear = await this.gradesRepository.findByNameAndYear(
            name,
            year,
        );

        if (gradeWithTheSameNameAndYear) {
            throw new AppError(
                'não é possível criar uma turma com o mesmo conjunto de nome e ano de outra!',
            );
        }

        const grade = await this.gradesRepository.create({
            name,
            value,
            year,
        });

        await this.cacheProvider.invalidate('grades');

        return grade;
    }
}
