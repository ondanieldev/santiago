import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default class UsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async find(): Promise<User[] | []> {
        return this.users;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = this.users.find(findUser => findUser.id === id);

        return user;
    }

    public async findByUsername(username: string): Promise<User | undefined> {
        const user = this.users.find(
            findUser => findUser.username === username,
        );

        return user;
    }

    public async create(data: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, data);

        this.users.push(user);

        return user;
    }

    public async save(data: User): Promise<User> {
        const user = this.users.find(findUser => findUser.id === data.id);

        Object.assign(user, data);

        return data;
    }
}
