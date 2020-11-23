import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import PaymentsController from '@modules/payments/infra/http/controllers/PaymentsController';
import EnrollmentPaymentsController from '@modules/payments/infra/http/controllers/EnrollmentPaymentsController';

const paymentsRouter = Router();
const paymentsController = new PaymentsController();
const enrollmentPaymentsController = new EnrollmentPaymentsController();

paymentsRouter.post(
    '/',
    (req, res, next) =>
        ensureAuthenticated(['pay_debits_permiss'])(req, res, next),
    celebrate({
        [Segments.BODY]: {
            debit_id: Joi.string().uuid().required(),
            method: Joi.string()
                .valid(
                    'creditCard',
                    'debitCard',
                    'cash',
                    'check',
                    'deposit',
                    'slip',
                )
                .required(),
        },
    }),
    paymentsController.create,
);

paymentsRouter.post(
    '/enrollment',
    (req, res, next) =>
        ensureAuthenticated(['pay_debits_permiss'])(req, res, next),
    celebrate({
        [Segments.BODY]: {
            debit_id: Joi.string().uuid().required(),
            method: Joi.string()
                .valid(
                    'creditCard',
                    'debitCard',
                    'cash',
                    'check',
                    'deposit',
                    'slip',
                )
                .required(),
        },
    }),
    enrollmentPaymentsController.create,
);

export default paymentsRouter;
