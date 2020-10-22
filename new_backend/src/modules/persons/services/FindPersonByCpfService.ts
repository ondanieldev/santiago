import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
import IPersonsRepository from '@modules/persons/repositories/IPersonsRepository';

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
        const person = await this.personsRepository.findByCpf(findCpf);

        if (!person) {
            return undefined;
        }

        const { id, name, cpf } = person;

        return { id, name, cpf };
    }
}
