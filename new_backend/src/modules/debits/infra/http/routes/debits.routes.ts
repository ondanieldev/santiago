import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ExtraDebitsController from '../controllers/ExtraDebitsController';

const debitsRouter = Router();

const extraDebitsController = new ExtraDebitsController();

debitsRouter.post(
    '/extra',
    (req, res, next) =>
        ensureAuthenticated(['create_extra_debits_permiss'])(req, res, next),
    celebrate({
        [Segments.BODY]: {
            contract_id: Joi.string().uuid().required(),
            description: Joi.string().required(),
            payment_limit_date: Joi.date().required(),
            value: Joi.number().positive().required(),
            discount: Joi.number().min(0),
            apply_interest_rules: Joi.boolean(),
        },
    }),
    extraDebitsController.create,
);

debitsRouter.put(
    '/extra/:debit_id',
    (req, res, next) =>
        ensureAuthenticated(['crud_extra_debits_permiss'])(req, res, next),
    celebrate({
        [Segments.PARAMS]: {
            debit_id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            description: Joi.string().required(),
            payment_limit_date: Joi.date().required(),
            value: Joi.number().integer().required(),
            discount: Joi.number().min(0),
            apply_interest_rules: Joi.boolean(),
        },
    }),
    extraDebitsController.update,
);

debitsRouter.delete(
    '/extra/:debit_id',
    (req, res, next) =>
        ensureAuthenticated(['crud_extra_debits_permiss'])(req, res, next),
    celebrate({
        [Segments.PARAMS]: {
            debit_id: Joi.string().uuid().required(),
        },
    }),
    extraDebitsController.delete,
);

export default debitsRouter;
