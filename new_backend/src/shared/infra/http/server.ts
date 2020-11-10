import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';

import AppError from '@shared/errors/AppError';

import uploadConfig from '@config/upload';
import mailConfig from '@config/mail';

import '@shared/infra/typeorm';
import '@shared/container';

// import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';

import routes from '@shared/infra/http/routes';

const app = express();
const port = process.env.APP_API_PORT || 3333;

// app.use(rateLimiter);

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

app.listen(port, () => {
    console.log(`Backend running on port ${port}!`);
});
