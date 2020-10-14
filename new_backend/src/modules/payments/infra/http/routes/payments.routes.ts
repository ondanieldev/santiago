import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import PaymentsController from '@modules/payments/infra/http/controllers/PaymentsController';

const paymentsRouter = Router();
const paymentsController = new PaymentsController();

paymentsRouter.use(ensureAuthenticated);

paymentsRouter.get('/', paymentsController.index);
paymentsRouter.post('/', paymentsController.create);

export default paymentsRouter;
