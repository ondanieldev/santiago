import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ContractPaymentsController from '../controllers/ContractPaymentsController';

const debitsRouter = Router();

const contractPaymentsController = new ContractPaymentsController();

debitsRouter.get(
    '/:contract_id/payments',
    (req, res, next) => ensureAuthenticated()(req, res, next),
    contractPaymentsController.index,
);

export default debitsRouter;
