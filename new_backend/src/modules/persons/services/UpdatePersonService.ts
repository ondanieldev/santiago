import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Person from '../infra/typeorm/entities/Person';
import IPersonsRepository from '../repositories/IPersonsRepository';

@injectable()
export default class UpdatePersonService {
    constructor(
        @inject('PersonsRepository')
        private personsRepository: IPersonsRepository,
    ) {}

    public async execute({ id, ...rest }: Person): Promise<Person> {
        const person = await this.personsRepository.findById(id);

        if (!person) {
            throw new AppError(
                'Não é possível atualizar os dados de um responsável inexistente!',
            );
        }

        Object.assign(person, rest);

        return person;
    }
}
