import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

export default interface IUsersRepository {
    find(): Promise<User[] | []>;
    findById(id: string): Promise<User | undefined>;
    findByUsername(useername: string): Promise<User | undefined>;
    create(data: ICreateUserDTO): Promise<User>;
    save(data: User): Promise<User>;
}
