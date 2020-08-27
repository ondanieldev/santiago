import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import DischargesController from '@modules/discharges/infra/http/controllers/DischargesController';

const dischargesRouter = Router();
const dischargesController = new DischargesController();

dischargesRouter.use(ensureAuthenticated);
dischargesRouter.post('/', dischargesController.create);

export default dischargesRouter;
