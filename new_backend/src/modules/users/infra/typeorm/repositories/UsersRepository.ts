import { Repository, getRepository, EntityRepository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

@EntityRepository(User)
export default class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async find(): Promise<User[] | []> {
        const users = await this.ormRepository.find();

        return users;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { id },
        });

        return user;
    }

    public async findByUsername(username: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { username },
            relations: ['profile'],
        });

        return user;
    }

    public async create(data: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(data);

        await this.ormRepository.save(user);

        return user;
    }

    public async save(data: User): Promise<User> {
        await this.ormRepository.save(data);

        return data;
    }
}
