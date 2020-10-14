import { Router } from 'express';

import GradesController from '@modules/grades/infra/http/controllers/GradesController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const gradesRouter = Router();
const gradesController = new GradesController();

gradesRouter.get('/', gradesController.index);
gradesRouter.post('/', ensureAuthenticated, gradesController.create);
gradesRouter.put('/:grade_id', ensureAuthenticated, gradesController.update);
gradesRouter.get('/:grade_id', ensureAuthenticated, gradesController.show);

export default gradesRouter;
