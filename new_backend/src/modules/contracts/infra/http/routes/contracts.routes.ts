import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ContractsController from '../controllers/ContractsController';
import ContractsGradeController from '../controllers/ContractsGradeController';
import AproovedContractsController from '../controllers/AproovedContractsController';
import DisaproovedContractsController from '../controllers/DisaproovedContractsController';
import AcceptedAndActiveContractsController from '../controllers/AcceptedAndActiveContractsController';
import UnderAnalysisAndPendentContractsController from '../controllers/UnderAnalysisAndPendentContractsController';
import StudentsAcceptedAndActiveContractsController from '../controllers/StudentsAcceptedAndActiveContractsController';
import GradesActiveContractsController from '../controllers/GradesActiveContractsController';
import StudentsActiveContractsController from '../controllers/StudentsActiveContractsController';

const contractsRouter = Router();

const contractsController = new ContractsController();
const contractsGradeController = new ContractsGradeController();
const aproovedContractsController = new AproovedContractsController();
const disaproovedContractsController = new DisaproovedContractsController();
const acceptedAndActiveContractsController = new AcceptedAndActiveContractsController();
const underAnalysisAndPendentContractsController = new UnderAnalysisAndPendentContractsController();
const studentsAcceptedAndActiveContractsController = new StudentsAcceptedAndActiveContractsController();
const gradesActiveContractsController = new GradesActiveContractsController();
const studentsActiveContractsController = new StudentsActiveContractsController();

contractsRouter.post('/', contractsController.create);

contractsRouter.get(
    '/accepted-active',
    (req, res, next) =>
        ensureAuthenticated('pay_debit_permiss')(req, res, next),
    acceptedAndActiveContractsController.index,
);

contractsRouter.get(
    '/accepted-active/students/:student_name',
    (req, res, next) => ensureAuthenticated()(req, res, next),
    studentsAcceptedAndActiveContractsController.index,
);

contractsRouter.get(
    '/under-analysis-pendent',
    (req, res, next) =>
        ensureAuthenticated('validate_enrollment_permiss')(req, res, next),
    underAnalysisAndPendentContractsController.index,
);

contractsRouter.get(
    '/active/grades/:grade_id',
    (req, res, next) =>
        ensureAuthenticated('validate_enrollment_permiss')(req, res, next),
    gradesActiveContractsController.index,
);

contractsRouter.get(
    '/active/students/:student_name',
    (req, res, next) =>
        ensureAuthenticated('validate_enrollment_permiss')(req, res, next),
    studentsActiveContractsController.index,
);

contractsRouter.get(
    '/:contract_id',
    (req, res, next) => ensureAuthenticated()(req, res, next),
    contractsController.show,
);

contractsRouter.patch(
    '/:contract_id/grade',
    (req, res, next) => ensureAuthenticated()(req, res, next),
    contractsGradeController.update,
);

contractsRouter.patch(
    '/:contract_id/aproove',
    (req, res, next) => ensureAuthenticated()(req, res, next),
    aproovedContractsController.update,
);

contractsRouter.patch(
    '/:contract_id/disaproove',
    (req, res, next) => ensureAuthenticated()(req, res, next),
    disaproovedContractsController.update,
);

export default contractsRouter;
