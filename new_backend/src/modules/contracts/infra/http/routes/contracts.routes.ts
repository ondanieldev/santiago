import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ContractsController from '../controllers/ContractsController';
import ContractsGradeController from '../controllers/ContractsGradeController';
import AproovedContractsController from '../controllers/AproovedContractsController';
import DisaproovedContractsController from '../controllers/DisaproovedContractsController';
import GradesAcceptedAndActiveContractsController from '../controllers/GradesAcceptedAndActiveContractsController';
import GradesUnderAnalysisAndPendentContractsController from '../controllers/GradesUnderAnalysisAndPendentContractsController';
import GradesActiveContractsController from '../controllers/GradesActiveContractsController';
import StudentsUnderAnalysisAndPendentContractsController from '../controllers/StudentsUnderAnalysisAndPendentContractsController';
import StudentsAcceptedAndActiveContractsControler from '../controllers/StudentsAcceptedAndActiveContractsControler';
import StudentsActiveContractsController from '../controllers/StudentsActiveContractsController';

const contractsRouter = Router();

const contractsController = new ContractsController();
const contractsGradeController = new ContractsGradeController();

const aproovedContractsController = new AproovedContractsController();
const disaproovedContractsController = new DisaproovedContractsController();

const gradesUnderAnalysisAndPendentContractsController = new GradesUnderAnalysisAndPendentContractsController();
const gradesAcceptedAndActiveContractsController = new GradesAcceptedAndActiveContractsController();
const gradesActiveContractsController = new GradesActiveContractsController();

const studentsUnderAnalysisAndPendentContractsController = new StudentsUnderAnalysisAndPendentContractsController();
const studentsAcceptedAndActiveContractsControler = new StudentsAcceptedAndActiveContractsControler();
const studentsActiveContractsController = new StudentsActiveContractsController();

contractsRouter.get(
    '/under-analysis-pendent/grades/:grade_id',
    (req, res, next) =>
        ensureAuthenticated(['validate_enrollments_permiss'])(req, res, next),
    celebrate({
        [Segments.PARAMS]: {
            grade_id: Joi.string().uuid().required(),
        },
    }),
    gradesUnderAnalysisAndPendentContractsController.index,
);

contractsRouter.get(
    '/accepted-active/grades/:grade_id',
    (req, res, next) =>
        ensureAuthenticated([
            'pay_debits_permiss',
            'discharge_payments_permiss',
        ])(req, res, next),
    celebrate({
        [Segments.PARAMS]: {
            grade_id: Joi.string().uuid().required(),
        },
    }),
    gradesAcceptedAndActiveContractsController.index,
);

contractsRouter.get(
    '/active/grades/:grade_id',
    (req, res, next) =>
        ensureAuthenticated([
            'create_extra_debits_permiss',
            'crud_extra_debits_permiss',
        ])(req, res, next),
    celebrate({
        [Segments.PARAMS]: {
            grade_id: Joi.string().uuid().required(),
        },
    }),
    gradesActiveContractsController.index,
);

contractsRouter.get(
    '/under-analysis-pendent/students/:grade_id',
    (req, res, next) =>
        ensureAuthenticated(['validate_enrollments_permiss'])(req, res, next),
    celebrate({
        [Segments.QUERY]: {
            student_name: Joi.string().required(),
        },
        [Segments.PARAMS]: {
            grade_id: Joi.string().uuid().required(),
        },
    }),
    studentsUnderAnalysisAndPendentContractsController.index,
);

contractsRouter.get(
    '/accepted-active/students/:grade_id',
    (req, res, next) =>
        ensureAuthenticated(['validate_enrollments_permiss'])(req, res, next),
    celebrate({
        [Segments.QUERY]: {
            student_name: Joi.string().required(),
        },
        [Segments.PARAMS]: {
            grade_id: Joi.string().uuid().required(),
        },
    }),
    studentsAcceptedAndActiveContractsControler.index,
);

contractsRouter.get(
    '/active/students/:grade_id',
    (req, res, next) =>
        ensureAuthenticated(['validate_enrollments_permiss'])(req, res, next),
    celebrate({
        [Segments.QUERY]: {
            student_name: Joi.string().required(),
        },
        [Segments.PARAMS]: {
            grade_id: Joi.string().uuid().required(),
        },
    }),
    studentsActiveContractsController.index,
);

contractsRouter.get(
    '/:contract_id',
    (req, res, next) =>
        ensureAuthenticated(['validate_enrollments_permiss'])(req, res, next),
    celebrate({
        [Segments.PARAMS]: {
            contract_id: Joi.string().uuid().required(),
        },
    }),
    contractsController.show,
);

contractsRouter.patch(
    '/:contract_id/grade',
    (req, res, next) =>
        ensureAuthenticated(['validate_enrollments_permiss'])(req, res, next),
    celebrate({
        [Segments.PARAMS]: {
            contract_id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            grade_id: Joi.string().uuid().required(),
        },
    }),
    contractsGradeController.update,
);

contractsRouter.patch(
    '/:contract_id/aproove',
    (req, res, next) =>
        ensureAuthenticated(['validate_enrollments_permiss'])(req, res, next),
    celebrate({
        [Segments.PARAMS]: {
            contract_id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            responsible_email: Joi.string().email(),
            responsible_name: Joi.string(),
            discount: Joi.number().min(0).optional().allow('').default(0),
            comment: Joi.string().optional().allow(''),
        },
    }),
    aproovedContractsController.update,
);

contractsRouter.patch(
    '/:contract_id/disaproove',
    (req, res, next) =>
        ensureAuthenticated(['validate_enrollments_permiss'])(req, res, next),
    celebrate({
        [Segments.PARAMS]: {
            contract_id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            responsible_email: Joi.string().email(),
            responsible_name: Joi.string(),
            comment: Joi.string().optional().allow(''),
        },
    }),
    disaproovedContractsController.update,
);

export default contractsRouter;
