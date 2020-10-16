import { Router } from 'express';

import GradesController from '@modules/grades/infra/http/controllers/GradesController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const gradesRouter = Router();
const gradesController = new GradesController();

gradesRouter.get('/', gradesController.index);
gradesRouter.post(
    '/',
    (req, res, next) => ensureAuthenticated()(req, res, next),
    gradesController.create,
);
gradesRouter.put(
    '/:grade_id',
    (req, res, next) => ensureAuthenticated()(req, res, next),
    gradesController.update,
);
gradesRouter.get(
    '/:grade_id',
    (req, res, next) => ensureAuthenticated()(req, res, next),
    gradesController.show,
);

export default gradesRouter;
