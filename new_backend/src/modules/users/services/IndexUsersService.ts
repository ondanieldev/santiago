import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
export default class IndexUsersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute(): Promise<User[] | []> {
        const users = await this.usersRepository.find();

        return users;
    }
}
