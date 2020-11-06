import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ContractDebitsController from '../controllers/ContractDebitsController';
import ContractExtraDebitsController from '../controllers/ContractExtraDebitsController';

const debitsRouter = Router();

const contractDebitsController = new ContractDebitsController();
const contractExtraDebitsController = new ContractExtraDebitsController();

debitsRouter.get(
    '/:contract_id/debits',
    (req, res, next) =>
        ensureAuthenticated(['pay_debits_permiss'])(req, res, next),
    contractDebitsController.index,
);

debitsRouter.get(
    '/:contract_id/debits/extra',
    (req, res, next) =>
        ensureAuthenticated(['crud_extra_debits_permiss'])(req, res, next),
    contractExtraDebitsController.index,
);

export default debitsRouter;
