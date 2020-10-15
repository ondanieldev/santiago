import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
export default class IndexUsersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    async execute(): Promise<User[] | []> {
        let users = await this.cacheProvider.recovery<User[]>('users');

        if (!users) {
            users = await this.usersRepository.find();

            await this.cacheProvider.register('users', users);
        }

        return users;
    }
}
