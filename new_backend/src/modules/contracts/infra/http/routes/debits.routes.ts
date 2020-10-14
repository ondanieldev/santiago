import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ContractDebitsController from '../controllers/ContractDebitsController';

const debitsRouter = Router();

const contractDebitsController = new ContractDebitsController();

debitsRouter.use(ensureAuthenticated);

debitsRouter.get('debits/:contract_id', contractDebitsController.index);

export default debitsRouter;
