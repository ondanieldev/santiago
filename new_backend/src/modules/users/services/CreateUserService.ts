import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
export default class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async execute({
        username,
        password,
        profile_id,
    }: ICreateUserDTO): Promise<User> {
        const userWithSameUsername = await this.usersRepository.findByUsername(
            username,
        );

        if (userWithSameUsername) {
            throw new AppError('Este nome de usuário já está em uso!');
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            username,
            password: hashedPassword,
            profile_id,
        });

        delete user.password;

        return user;
    }
}
