import { Router } from 'express';

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
    usersController.create,
);

usersRouter.put(
    '/:user_id',
    (req, res, next) =>
        ensureAuthenticated(['crud_users_permiss'])(req, res, next),
    usersController.update,
);

export default usersRouter;
