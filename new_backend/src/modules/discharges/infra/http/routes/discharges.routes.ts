import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import DischargesController from '../controllers/DischargesController';

const dischargesRouter = Router();
const dischargesController = new DischargesController();

dischargesRouter.post(
    '/',
    (req, res, next) =>
        ensureAuthenticated(['discharge_payments_permiss'])(req, res, next),
    celebrate({
        [Segments.BODY]: {
            payment_id: Joi.string().uuid().required(),
        },
    }),
    dischargesController.create,
);

export default dischargesRouter;
