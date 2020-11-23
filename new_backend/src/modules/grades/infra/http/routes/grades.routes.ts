import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import GradesController from '@modules/grades/infra/http/controllers/GradesController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const gradesRouter = Router();
const gradesController = new GradesController();

gradesRouter.get('/', gradesController.index);

gradesRouter.post(
    '/',
    (req, res, next) =>
        ensureAuthenticated(['crud_grades_permiss'])(req, res, next),
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            year: Joi.string().required(),
            value: Joi.number().min(0).required(),
        },
    }),
    gradesController.create,
);

gradesRouter.put(
    '/:grade_id',
    (req, res, next) =>
        ensureAuthenticated(['crud_grades_permiss'])(req, res, next),
    celebrate({
        [Segments.PARAMS]: {
            grade_id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            year: Joi.string().required(),
            value: Joi.number().min(0).required(),
        },
    }),
    gradesController.update,
);

gradesRouter.get(
    '/:grade_id',
    (req, res, next) =>
        ensureAuthenticated(['crud_grades_permiss'])(req, res, next),
    celebrate({
        [Segments.PARAMS]: {
            grade_id: Joi.string().uuid().required(),
        },
    }),
    gradesController.show,
);

export default gradesRouter;
