import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import DischargesController from '../controllers/DischargesController';

const dischargesRouter = Router();
const dischargesController = new DischargesController();

dischargesRouter.post(
    '/',
    (req, res, next) =>
        ensureAuthenticated(['discharge_payments_permiss'])(req, res, next),
    dischargesController.create,
);

export default dischargesRouter;
