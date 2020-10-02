import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUpdateGradeDTO from '@modules/grades/dtos/IUpdateGradeDTO';
import Grade from '@modules/grades/infra/typeorm/entities/Grade';

@injectable()
export default class CreateGradeService {
    constructor(
        @inject('GradesRepository')
        private gradesRepository: IGradesRepository,
    ) {}

    public async execute({
        id,
        name,
        value,
        year,
    }: IUpdateGradeDTO): Promise<Grade> {
        const grade = await this.gradesRepository.findById(id);

        if (!grade) {
            throw new AppError('esta turma não existe!');
        }

        grade.name = name;
        grade.value = value;
        grade.year = year;

        await this.gradesRepository.save(grade);

        return grade;
    }
}
