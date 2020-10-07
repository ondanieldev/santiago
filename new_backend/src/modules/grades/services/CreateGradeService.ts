import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Grade from '@modules/grades/infra/typeorm/entities/Grade';
import ICreateGradeDTO from '@modules/grades/dtos/ICreateGradeDTO';

@injectable()
export default class CreateGradeService {
    constructor(
        @inject('GradesRepository')
        private gradesRepository: IGradesRepository,
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
                'Não é possível criar uma turma com o mesmo nome e ano de outra!',
            );
        }

        const grade = await this.gradesRepository.create({
            name,
            value,
            year,
        });

        return grade;
    }
}
