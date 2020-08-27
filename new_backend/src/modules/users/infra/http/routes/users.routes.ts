import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import UsersController from '@modules/users/infra/http/controllers/UsersController';

const usersController = new UsersController();
const usersRouter = Router();

usersRouter.use(ensureAuthenticated);
usersRouter.post('/', usersController.create);

export default usersRouter;
