import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import DebitsController from '@modules/debits/infra/http/controllers/DebitsController';

const debitsRouter = Router();
const debitsController = new DebitsController();

debitsRouter.use(ensureAuthenticated);
debitsRouter.get('/:contract_id', debitsController.index);

export default debitsRouter;
