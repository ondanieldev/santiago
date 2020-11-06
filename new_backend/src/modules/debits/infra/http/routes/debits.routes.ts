import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ExtraDebitsController from '../controllers/ExtraDebitsController';

const debitsRouter = Router();

const extraDebitsController = new ExtraDebitsController();

debitsRouter.post(
    '/extra',
    (req, res, next) =>
        ensureAuthenticated(['create_extra_debits_permiss'])(req, res, next),
    extraDebitsController.create,
);

debitsRouter.put(
    '/extra/:debit_id',
    (req, res, next) =>
        ensureAuthenticated(['crud_extra_debits_permiss'])(req, res, next),
    extraDebitsController.update,
);

debitsRouter.delete(
    '/extra/:debit_id',
    (req, res, next) =>
        ensureAuthenticated(['crud_extra_debits_permiss'])(req, res, next),
    extraDebitsController.delete,
);

export default debitsRouter;
