import { injectable, inject } from 'tsyringe';

import Grade from '@modules/grades/infra/typeorm/entities/Grade';
import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class FindGradeByIdService {
    constructor(
        @inject('GradesRepository')
        private gradesRepository: IGradesRepository,
    ) {}

    public async execute(id: string): Promise<Grade | undefined> {
        const grade = await this.gradesRepository.findById(id);

        if (!grade) {
            throw new AppError(
                'Não é possível obter os dados de uma turma inexistente',
            );
        }

        return grade;
    }
}
