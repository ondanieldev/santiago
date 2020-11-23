import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ContractPaymentsController from '../controllers/ContractPaymentsController';

const debitsRouter = Router();

const contractPaymentsController = new ContractPaymentsController();

debitsRouter.get(
    '/:contract_id/payments',
    (req, res, next) =>
        ensureAuthenticated(['discharge_payments_permiss'])(req, res, next),
    celebrate({
        [Segments.PARAMS]: {
            contract_id: Joi.string().uuid().required(),
        },
    }),
    contractPaymentsController.index,
);

export default debitsRouter;
