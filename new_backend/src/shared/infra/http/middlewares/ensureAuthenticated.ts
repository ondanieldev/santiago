import { Request, Response, NextFunction } from 'express';
import { verify, decode } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import IPermissions from '@modules/profiles/dtos/IPermissions';

interface ITokenPayload extends IPermissions {
    iat: number;
    exp: number;
    sub: string;
}

export default (
    permissions?: (
        | 'create_new_enrollments_permiss'
        | 'validate_enrollments_permiss'
        | 'create_extra_debits_permiss'
        | 'pay_debits_permiss'
        | 'discharge_payments_permiss'
        | 'crud_profiles_permiss'
        | 'crud_users_permiss'
        | 'crud_grades_permiss'
        | 'crud_extra_debits_permiss'
    )[],
): Function => {
    return (request: Request, response: Response, next: NextFunction): void => {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new AppError('JWT token is missing', 401);
        }

        const [, token] = authHeader.split(' ');

        try {
            verify(token, authConfig.jwt.secret);

            const decoded = decode(token);

            const {
                sub,
                create_new_enrollments_permiss,
                validate_enrollments_permiss,
                create_extra_debits_permiss,
                pay_debits_permiss,
                discharge_payments_permiss,
                crud_profiles_permiss,
                crud_users_permiss,
                crud_grades_permiss,
                crud_extra_debits_permiss,
            } = decoded as ITokenPayload;

            request.user = {
                id: sub,
                create_new_enrollments_permiss,
                validate_enrollments_permiss,
                create_extra_debits_permiss,
                pay_debits_permiss,
                discharge_payments_permiss,
                crud_profiles_permiss,
                crud_users_permiss,
                crud_grades_permiss,
                crud_extra_debits_permiss,
            };

            if (permissions) {
                let hasPermiss = false;

                permissions.forEach(permiss => {
                    if (request.user[permiss]) {
                        hasPermiss = true;
                    }
                });

                if (hasPermiss) {
                    return next();
                }

                throw new AppError('');
            } else {
                return next();
            }
        } catch (err) {
            if (err instanceof AppError) {
                throw new AppError(
                    'You do not have permiss to execute this function!',
                    401,
                );
            }
            throw new AppError('Token expirado, faça login novamente!', 401);
        }
    };
};
