import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUpdateGradeDTO from '@modules/grades/dtos/IUpdateGradeDTO';
import Grade from '@modules/grades/infra/typeorm/entities/Grade';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
export default class UpdateGradeService {
    constructor(
        @inject('GradesRepository')
        private gradesRepository: IGradesRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(data: IUpdateGradeDTO): Promise<Grade> {
        const grade = await this.gradesRepository.findById(data.id);

        if (!grade) {
            throw new AppError(
                'Não é possível atualizar os dados de uma turma inexistente!',
            );
        }

        const gradeWithTheSameNameAndYear = await this.gradesRepository.findByNameAndYear(
            data.name,
            data.year,
        );

        if (
            gradeWithTheSameNameAndYear &&
            gradeWithTheSameNameAndYear.id !== grade.id
        ) {
            throw new AppError(
                'Não é possível atualizar os dados de uma turma utilizando o mesmo conjunto de nome e ano de outra!',
            );
        }

        Object.assign(grade, data);

        await this.gradesRepository.save(grade);

        await this.cacheProvider.invalidate('grades');

        return grade;
    }
}
