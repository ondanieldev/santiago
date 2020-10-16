import { Request, Response, NextFunction } from 'express';
import { verify, decode } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface ITokenPayload {
    crud_grades_permiss: boolean;
    crud_profiles_permiss: boolean;
    crud_users_permiss: boolean;
    discharge_payment_permiss: boolean;
    new_enrollment_permiss: boolean;
    pay_debit_permiss: boolean;
    validate_enrollment_permiss: boolean;
    iat: number;
    exp: number;
    sub: string;
}

export default (
    permission?:
        | 'crud_grades_permiss'
        | 'crud_profiles_permiss'
        | 'crud_users_permiss'
        | 'discharge_payment_permiss'
        | 'new_enrollment_permiss'
        | 'pay_debit_permiss'
        | 'validate_enrollment_permiss',
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
                crud_grades_permiss,
                crud_profiles_permiss,
                crud_users_permiss,
                discharge_payment_permiss,
                new_enrollment_permiss,
                pay_debit_permiss,
                validate_enrollment_permiss,
            } = decoded as ITokenPayload;

            request.user = {
                id: sub,
                crud_grades_permiss,
                crud_profiles_permiss,
                crud_users_permiss,
                discharge_payment_permiss,
                new_enrollment_permiss,
                pay_debit_permiss,
                validate_enrollment_permiss,
            };

            if (permission) {
                if (request.user[permission]) {
                    return next();
                }
                throw new AppError('');
            } else {
                return next();
            }
        } catch (err) {
            if (err instanceof AppError) {
                throw new AppError('You do not have permiss!', 401);
            }
            throw new AppError('Invalid JWT token.', 401);
        }
    };
};
