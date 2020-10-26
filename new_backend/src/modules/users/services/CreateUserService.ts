import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
export default class CreateUserService {
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
        username,
        password,
        profile_id,
    }: ICreateUserDTO): Promise<User> {
        const checkIfProfilesExists = await this.profilesRepository.findById(
            profile_id,
        );

        if (!checkIfProfilesExists) {
            throw new AppError(
                'não é possível criar um usuário associado a um perfil inexistente!',
            );
        }

        const userWithSameUsername = await this.usersRepository.findByUsername(
            username,
        );

        if (userWithSameUsername) {
            throw new AppError(
                'não é possível criar um usuário com um nome de usuário que já está em uso!',
            );
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            username,
            password: hashedPassword,
            profile_id,
        });

        await this.cacheProvider.invalidate('users');

        return user;
    }
}
