import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import User from '@modules/users/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

interface IRequest {
    username: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
export default class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ username, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByUsername(username);

        if (!user) {
            throw new AppError('Credenciais incorretas!', 401);
        }

        const passwordsMatches = await this.hashProvider.compare(
            password,
            user.password,
        );

        if (!passwordsMatches) {
            throw new AppError('Credenciais incorretas!', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign(
            {
                crud_grades_permiss: user.profile.crud_grades_permiss,
                crud_profiles_permiss: user.profile.crud_profiles_permiss,
                crud_users_permiss: user.profile.crud_users_permiss,
                discharge_payment_permiss:
                    user.profile.discharge_payment_permiss,
                new_enrollment_permiss: user.profile.new_enrollment_permiss,
                pay_debit_permiss: user.profile.pay_debit_permiss,
                validate_enrollment_permiss:
                    user.profile.validate_enrollment_permiss,
            },
            secret,
            {
                subject: user.id,
                expiresIn,
            },
        );

        return {
            user,
            token,
        };
    }
}
