import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import PaymentsController from '@modules/payments/infra/http/controllers/PaymentsController';
import EnrollmentPaymentsController from '@modules/payments/infra/http/controllers/EnrollmentPaymentsController';

const paymentsRouter = Router();
const paymentsController = new PaymentsController();
const enrollmentPaymentsController = new EnrollmentPaymentsController();

paymentsRouter.post(
    '/',
    (req, res, next) => ensureAuthenticated()(req, res, next),
    paymentsController.create,
);
paymentsRouter.post(
    '/enrollment',
    (req, res, next) => ensureAuthenticated()(req, res, next),
    enrollmentPaymentsController.create,
);

export default paymentsRouter;
