import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPersonsRepository from '@modules/persons/repositories/IPersonsRepository';
import checkIfCPFIsValid from '@shared/utils/checkIfCPFIsValid';

interface IResponse {
    id: string;
    cpf: string;
    name: string;
}

@injectable()
export default class FindPersonByCpfService {
    constructor(
        @inject('PersonsRepository')
        private personsRepository: IPersonsRepository,
    ) {}

    public async execute(findCpf: string): Promise<IResponse | undefined> {
        if (!checkIfCPFIsValid(findCpf)) {
            throw new AppError(
                'CPF inválido! Certifique-se de digitar apenas números.',
            );
        }

        const person = await this.personsRepository.findByCpf(findCpf);

        if (!person) {
            return undefined;
        }

        const { id, name, cpf } = person;

        return { id, name, cpf };
    }
}
