import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import StudentsController from '@modules/students/infra/http/controllers/StudentsController';
import StudentsPhotosController from '@modules/students/infra/http/controllers/StudentsPhotosController';

const studentsRouter = Router();

const upload = multer(uploadConfig.multer);

const studentsController = new StudentsController();
const studentsPhotosController = new StudentsPhotosController();

studentsRouter.put(
    '/:student_id',
    (req, res, next) =>
        ensureAuthenticated(['validate_enrollments_permiss'])(req, res, next),
    celebrate({
        [Segments.PARAMS]: {
            student_id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            birth_city: Joi.string().required(),
            birth_date: Joi.date().required(),
            birth_state: Joi.string().length(2).required(),
            ease_relating: Joi.boolean().required(),
            father_name: Joi.string().required(),
            gender: Joi.string().valid('male', 'female').required(),
            mother_name: Joi.string().required(),
            nacionality: Joi.string().required(),
            name: Joi.string().required(),
            race: Joi.string()
                .valid('white', 'brown', 'black', 'indigenous', 'yellow')
                .required(),
            food_alergy: Joi.string(),
            health_plan: Joi.string(),
            health_problem: Joi.string(),
            medication_alergy: Joi.string(),
            origin_school: Joi.string(),
            special_necessities: Joi.string(),
        },
    }),
    studentsController.update,
);

studentsRouter.patch(
    '/photos/:student_id',
    (req, res, next) =>
        ensureAuthenticated([
            'create_new_enrollments_permiss',
            'validate_enrollments_permiss',
        ])(req, res, next),
    celebrate({
        [Segments.PARAMS]: {
            student_id: Joi.string().uuid().required(),
        },
    }),
    upload.any(),
    studentsPhotosController.update,
);

export default studentsRouter;
