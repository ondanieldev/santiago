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
    permissions?: Extract<keyof IPermissions, keyof IPermissions>[],
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
                iat,
                exp,
                ...permissionsFromToken
            } = decoded as ITokenPayload;

            request.user = {
                id: sub,
                ...permissionsFromToken,
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
