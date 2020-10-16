import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';

import AppError from '@shared/errors/AppError';

import uploadConfig from 'config/upload';
import mailConfig from 'config/mail';

import routes from '@shared/infra/http/routes';

import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(rateLimiter);

app.use(cors());

app.use(express.json());

app.use(
    '/files',
    express.static(uploadConfig.uploadFolder),
    express.static(mailConfig.imagesFolder),
);

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
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
});

app.listen(3333, () => {
    console.log('Backend running on port 3333!');
});
