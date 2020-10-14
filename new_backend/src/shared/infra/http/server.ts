import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import 'express-async-errors';

import uploadConfig from 'config/upload';
import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

const mailImagesPath = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'assets',
    'images',
);

app.use(cors());
app.use(express.json());
app.use(
    '/files',
    express.static(uploadConfig.uploadFolder),
    express.static(mailImagesPath),
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
