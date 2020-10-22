import { Repository, getRepository, EntityRepository } from 'typeorm';

import Person from '@modules/persons/infra/typeorm/entities/Person';
import IPersonsRepository from '@modules/persons/repositories/IPersonsRepository';
import ICreatePersonDTO from '@modules/persons/dtos/ICreatePersonDTO';
import IFindByRgCpfOrEmailDTO from '@modules/persons/dtos/IFindByRgCpfOrEmailDTO';

@EntityRepository(Person)
export default class PersonsRepository implements IPersonsRepository {
    private ormRepository: Repository<Person>;

    constructor() {
        this.ormRepository = getRepository(Person);
    }

    public async findById(id: string): Promise<Person | undefined> {
        const person = await this.ormRepository.findOne({
            where: { id },
        });

        return person;
    }

    public async findByCpf(cpf: string): Promise<Person | undefined> {
        const person = await this.ormRepository.findOne({
            where: { cpf },
        });

        return person;
    }

    public async findByRgCpfOrEmail({
        cpf,
        email,
        rg,
    }: IFindByRgCpfOrEmailDTO): Promise<Person | undefined> {
        const person = await this.ormRepository.findOne({
            where: [{ email }, { cpf }, { rg }],
        });

        return person;
    }

    public async create(data: ICreatePersonDTO): Promise<Person> {
        const person = this.ormRepository.create(data);

        await this.ormRepository.save(person);

        return person;
    }

    public async save(data: Person): Promise<Person> {
        const person = await this.ormRepository.save(data);

        return person;
    }

    public async updateUser(
        person_id: string,
        user_id: string,
    ): Promise<Person | undefined> {
        const person = await this.ormRepository.findOne({
            where: { id: person_id },
        });

        if (person) {
            Object.assign(person, { user_id });

            await this.ormRepository.save(person);
        }

        return person;
    }
}
