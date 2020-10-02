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
    apay_debit_permiss: boolean;
    validate_enrollment_permiss: boolean;
    iat: number;
    exp: number;
    sub: string;
}

export default (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
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
            apay_debit_permiss,
            validate_enrollment_permiss,
        } = decoded as ITokenPayload;

        request.user = {
            id: sub,
            crud_grades_permiss,
            crud_profiles_permiss,
            crud_users_permiss,
            discharge_payment_permiss,
            new_enrollment_permiss,
            apay_debit_permiss,
            validate_enrollment_permiss,
        };

        return next();
    } catch (err) {
        throw new AppError('Invalid JWT token.', 401);
    }
};
