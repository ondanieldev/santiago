import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
export default class UpdateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
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

        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('este usuário não existe!');
        }

        const hashedPassword = await hash(password, 8);

        user.username = username;
        user.password = hashedPassword;
        user.profile_id = profile_id;

        await this.usersRepository.save(user);

        delete user.password;

        return user;
    }
}
