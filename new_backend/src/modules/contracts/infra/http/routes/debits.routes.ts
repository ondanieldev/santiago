import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ContractDebitsController from '../controllers/ContractDebitsController';

const debitsRouter = Router();

const contractDebitsController = new ContractDebitsController();

debitsRouter.get(
    '/:contract_id/debits',
    (req, res, next) => ensureAuthenticated()(req, res, next),
    contractDebitsController.index,
);

export default debitsRouter;
