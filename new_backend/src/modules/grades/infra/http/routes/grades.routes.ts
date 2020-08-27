import { Router } from 'express';

import GradesController from '@modules/grades/infra/http/controllers/GradesController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const gradesRouter = Router();
const gradesController = new GradesController();

gradesRouter.use(ensureAuthenticated);
gradesRouter.post('/', gradesController.create);

export default gradesRouter;
