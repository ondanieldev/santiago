import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ContractDebitsController from '../controllers/ContractDebitsController';

const debitsRouter = Router();

const contractDebitsController = new ContractDebitsController();

debitsRouter.use(ensureAuthenticated);

debitsRouter.get('/:contract_id/debits', contractDebitsController.index);

export default debitsRouter;
