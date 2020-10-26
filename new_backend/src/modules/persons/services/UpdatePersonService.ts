import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Person from '../infra/typeorm/entities/Person';
import IUpdatePersonDTO from '../dtos/IUpdatePersonDTO';
import IPersonsRepository from '../repositories/IPersonsRepository';

@injectable()
export default class UpdatePersonService {
    constructor(
        @inject('PersonsRepository')
        private personsRepository: IPersonsRepository,
    ) {}

    public async execute({ id, ...rest }: IUpdatePersonDTO): Promise<Person> {
        const person = await this.personsRepository.findById(id);

        if (!person) {
            throw new AppError(
                'não é possível atualizar os dados de uma pessoa inexistente!',
            );
        }

        Object.assign(person, rest);

        return person;
    }
}
