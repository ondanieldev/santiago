import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPersonsRepository from '@modules/persons/repositories/IPersonsRepository';
import ICreatePersonDTO from '@modules/persons/dtos/ICreatePersonDTO';
import Person from '@modules/persons/infra/typeorm/entities/Person';

@injectable()
export default class CreatePersonService {
    constructor(
        @inject('PersonsRepository')
        private personsRepository: IPersonsRepository,
    ) {}

    public async execute(data: ICreatePersonDTO): Promise<Person> {
        const personWithSameCpfOrRgOrEmail = await this.personsRepository.findByRgCpfOrEmail(
            {
                rg: data.rg,
                cpf: data.cpf,
                email: data.email,
            },
        );

        if (personWithSameCpfOrRgOrEmail) {
            throw new AppError('RG, CPF ou e-mail em uso!');
        }

        const person = await this.personsRepository.create(data);

        return person;
    }
}
