import Person from '@modules/persons/infra/typeorm/entities/Person';
import ICreatePersonDTO from '@modules/persons/dtos/ICreatePersonDTO';
import IFindByRgCpfOrEmailDTO from '@modules/persons/dtos/IFindByRgCpfOrEmailDTO';

export default interface IPersonsRepository {
    findById(id: string): Promise<Person | undefined>;
    findByCpf(cpf: string): Promise<Person | undefined>;
    findByRgCpfOrEmail(
        data: IFindByRgCpfOrEmailDTO,
    ): Promise<Person | undefined>;
    create(data: ICreatePersonDTO): Promise<Person>;
    save(data: Person): Promise<Person>;
    updateUser(
        student_id: string,
        user_id: string,
    ): Promise<Person | undefined>;
    dangerouslyDelete(id: string): Promise<void>;
}
