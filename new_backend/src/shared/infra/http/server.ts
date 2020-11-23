import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';

import '@shared/container';

import express from 'express';
import cors from 'cors';
import { errors as handleCelebrateErrors } from 'celebrate';

import mailConfig from '@config/mail';
import uploadConfig from '@config/upload';
import routes from '@shared/infra/http/routes';
// import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
import postgresConnect from '@shared/infra/typeorm';
import handleClientErrors from '@shared/infra/http/middlewares/handleClientErrors';

postgresConnect();

const app = express();
const port = process.env.APP_API_PORT || 3333;

app.use(cors());
app.use(express.json());
// app.use(rateLimiter);
app.use(
    '/files',
    express.static(uploadConfig.uploadFolder),
    express.static(mailConfig.imagesFolder),
);
app.use(routes);
app.use(handleCelebrateErrors());
app.use(handleClientErrors);

app.listen(port, () => {
    console.log(`Backend running on port ${port}!`);
});
