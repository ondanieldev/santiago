import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

export default interface IUsersRepository {
    findByUsername(useername: string): Promise<User | undefined>;
    create(data: ICreateUserDTO): Promise<User>;
}
