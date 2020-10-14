import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPersonsRepository from '@modules/persons/repositories/IPersonsRepository';
import checkIfCpfIsValid from '@shared/utils/checkIfCPFIsValid';
import Person from '../infra/typeorm/entities/Person';
import ICreatePersonDTO from '../dtos/ICreatePersonDTO';

@injectable()
export default class CreatePersonService {
    constructor(
        @inject('PersonsRepository')
        private personsRepository: IPersonsRepository,
    ) {}

    public async execute(data: ICreatePersonDTO): Promise<Person> {
        const validCPF = checkIfCpfIsValid(data.cpf);

        if (!validCPF) {
            throw new AppError(
                'Não é possível criar um responsável com CPF inválido!',
            );
        }

        const responsibleWithTheSameCredentials = await this.personsRepository.findByRgCpfOrEmail(
            {
                rg: data.rg,
                cpf: data.cpf,
                email: data.email,
            },
        );

        if (responsibleWithTheSameCredentials) {
            throw new AppError(
                'Não é possível criar um responsável com um CPF, RG ou e-mail que já está em uso!',
            );
        }

        const responsible = await this.personsRepository.create(data);

        return responsible;
    }
}
