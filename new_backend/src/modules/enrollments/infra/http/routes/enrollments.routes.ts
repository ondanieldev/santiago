import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import EnrollmentsController from '../controllers/EnrollmentsController';

const enrollmentsRouter = Router();

const enrollmentsController = new EnrollmentsController();

enrollmentsRouter.post(
    '/',
    (req, res, next) =>
        ensureAuthenticated(['create_new_enrollments_permiss'])(req, res, next),
    enrollmentsController.create,
);

export default enrollmentsRouter;
