import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
export default class UpdateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('ProfilesRepository')
        private profilesRepository: IProfilesRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    async execute({
        id,
        username,
        password,
        profile_id,
    }: IUpdateUserDTO): Promise<User> {
        const userWithSameUsername = await this.usersRepository.findByUsername(
            username,
        );

        if (userWithSameUsername && userWithSameUsername.id !== id) {
            throw new AppError('este nome de usuário já está em uso!');
        }

        const verifyIfProfileExists = await this.profilesRepository.findById(
            profile_id,
        );

        if (!verifyIfProfileExists) {
            throw new AppError('este perfil não existe!');
        }

        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('este usuário não existe!');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        user.username = username;
        user.password = hashedPassword;
        user.profile_id = profile_id;

        await this.usersRepository.save(user);

        await this.cacheProvider.invalidate('users');

        return user;
    }
}
