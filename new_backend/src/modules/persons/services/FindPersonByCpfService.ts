import { injectable, inject } from 'tsyringe';

import IPersonsRepository from '@modules/persons/repositories/IPersonsRepository';
import Person from '@modules/persons/infra/typeorm/entities/Person';

@injectable()
export default class FindPersonByCpfService {
    constructor(
        @inject('PersonsRepository')
        private personsRepository: IPersonsRepository,
    ) {}

    public async execute(cpf: string): Promise<Person | undefined> {
        const person = await this.personsRepository.findByCpf(cpf);

        return person;
    }
}
