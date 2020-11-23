import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import PersonsController from '@modules/persons/infra/http/controllers/PersonsController';
import PersonPhotosController from '@modules/persons/infra/http/controllers/PersonPhotosController';

const personsRouter = Router();

const upload = multer(uploadConfig.multer);

const personsController = new PersonsController();
const personPhotosController = new PersonPhotosController();

personsRouter.get(
    '/:cpf',
    (req, res, next) =>
        ensureAuthenticated(['create_new_enrollments_permiss'])(req, res, next),
    celebrate({
        [Segments.PARAMS]: {
            cpf: Joi.string().length(11).required(),
        },
    }),
    personsController.show,
);

personsRouter.put(
    '/:person_id',
    (req, res, next) =>
        ensureAuthenticated(['validate_enrollments_permiss'])(req, res, next),
    celebrate({
        [Segments.PARAMS]: {
            person_id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            birth_date: Joi.date().required(),
            nacionality: Joi.string().required(),
            civil_state: Joi.string()
                .valid('single', 'married', 'divorced', 'widower', 'separeted')
                .required(),
            profission: Joi.string().required(),
            cpf: Joi.string().length(11).required(),
            rg: Joi.string().required(),
            address_street: Joi.string().required(),
            address_number: Joi.string().required(),
            address_complement: Joi.string(),
            address_neighborhood: Joi.string().required(),
            address_city: Joi.string().required(),
            address_cep: Joi.string().length(8).required(),
            residencial_phone: Joi.string().required(),
            commercial_phone: Joi.string().required(),
            personal_phone: Joi.string().required(),
            education_level: Joi.string()
                .valid(
                    'elementary_incompleted',
                    'elementary_completed',
                    'highschool_incompleted',
                    'highschool_completed',
                    'university_incompleted',
                    'university_completed',
                )
                .required(),
            workplace: Joi.string().required(),
            monthly_income: Joi.string()
                .valid('a_class', 'b_class', 'c_class', 'd_class', 'e_class')
                .required(),
            income_tax: Joi.boolean(),
            email: Joi.string().email().required(),
            kinship: Joi.string(),
        },
    }),
    personsController.update,
);

personsRouter.patch(
    '/photos/:person_id',
    (req, res, next) =>
        ensureAuthenticated([
            'create_new_enrollments_permiss',
            'validate_enrollments_permiss',
        ])(req, res, next),
    celebrate({
        [Segments.PARAMS]: {
            person_id: Joi.string().uuid().required(),
        },
    }),
    upload.any(),
    personPhotosController.update,
);

export default personsRouter;
