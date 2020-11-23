import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

export default function handleClientErrors(
    err: Error,
    request: Request,
    response: Response,
    _: NextFunction,
): Response {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
        });
    }

    console.log(err);

    return response.status(500).json({
        statusCode: 500,
        message: 'Internal server error.',
    });
}
