import { v4 } from 'uuid';

import Person from '@modules/persons/infra/typeorm/entities/Person';
import IPersonsRepository from '@modules/persons/repositories/IPersonsRepository';
import ICreatePersonDTO from '@modules/persons/dtos/ICreatePersonDTO';
import IFindByRgCpfOrEmailDTO from '@modules/persons/dtos/IFindByRgCpfOrEmailDTO';

export default class PersonsRepository implements IPersonsRepository {
    private persons: Person[] = [];

    public async findById(id: string): Promise<Person | undefined> {
        const person = this.persons.find(findPerson => findPerson.id === id);

        return person;
    }

    public async findByCpf(cpf: string): Promise<Person | undefined> {
        const person = this.persons.find(findPerson => findPerson.cpf === cpf);

        return person;
    }

    public async findByRgCpfOrEmail({
        cpf,
        email,
        rg,
    }: IFindByRgCpfOrEmailDTO): Promise<Person | undefined> {
        const person = this.persons.find(
            findPerson =>
                findPerson.cpf === cpf ||
                findPerson.email === email ||
                findPerson.rg === rg,
        );

        return person;
    }

    public async create(data: ICreatePersonDTO): Promise<Person> {
        const person = new Person();

        Object.assign(person, { id: v4() }, data);

        this.persons.push(person);

        return person;
    }

    public async save(data: Person): Promise<Person> {
        const person = this.persons.find(
            findPerson => findPerson.id === data.id,
        );

        Object.assign(person, data);

        return data;
    }

    public async updateUser(
        student_id: string,
        user_id: string,
    ): Promise<Person | undefined> {
        const person = this.persons.find(
            findPerson => findPerson.id === student_id,
        );

        Object.assign(person, { user_id });

        return person;
    }
}
