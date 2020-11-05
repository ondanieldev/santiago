import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ExtraDebitsController from '../controllers/ExtraDebitsController';

const debitsRouter = Router();

const extraDebitsController = new ExtraDebitsController();

debitsRouter.post(
    '/extra',
    (req, res, next) => ensureAuthenticated()(req, res, next),
    extraDebitsController.create,
);

debitsRouter.put(
    '/extra/:debit_id',
    (req, res, next) => ensureAuthenticated()(req, res, next),
    extraDebitsController.update,
);

debitsRouter.delete(
    '/extra/:debit_id',
    (req, res, next) => ensureAuthenticated()(req, res, next),
    extraDebitsController.delete,
);

export default debitsRouter;
