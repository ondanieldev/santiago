import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import UsersController from '@modules/users/infra/http/controllers/UsersController';

const usersController = new UsersController();
const usersRouter = Router();

usersRouter.get(
    '/',
    (req, res, next) =>
        ensureAuthenticated(['crud_users_permiss'])(req, res, next),
    usersController.index,
);

usersRouter.post(
    '/',
    (req, res, next) =>
        ensureAuthenticated(['crud_users_permiss'])(req, res, next),
    celebrate({
        [Segments.BODY]: {
            username: Joi.string().required(),
            password: Joi.string().required(),
            profile_id: Joi.string().uuid().required(),
        },
    }),
    usersController.create,
);

usersRouter.put(
    '/:user_id',
    (req, res, next) =>
        ensureAuthenticated(['crud_users_permiss'])(req, res, next),
    celebrate({
        [Segments.PARAMS]: {
            user_id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            username: Joi.string().required(),
            password: Joi.string().required(),
            profile_id: Joi.string().uuid().required(),
        },
    }),
    usersController.update,
);

export default usersRouter;
