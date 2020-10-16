import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ContractsController from '../controllers/ContractsController';
import ContractsGradeController from '../controllers/ContractsGradeController';
import AproovedContractsController from '../controllers/AproovedContractsController';
import DisaproovedContractsController from '../controllers/DisaproovedContractsController';
import AcceptedAndActiveContractsController from '../controllers/AcceptedAndActiveContractsController';
import UnderAnalysisAndPendentContractsController from '../controllers/UnderAnalysisAndPendentContractsController';
import StudentsContractsController from '../controllers/StudentsContractsController';

const contractsRouter = Router();

const contractsController = new ContractsController();
const contractsGradeController = new ContractsGradeController();
const aproovedContractsController = new AproovedContractsController();
const disaproovedContractsController = new DisaproovedContractsController();
const acceptedAndActiveContractsController = new AcceptedAndActiveContractsController();
const underAnalysisAndPendentContractsController = new UnderAnalysisAndPendentContractsController();
const studentsContractsController = new StudentsContractsController();

contractsRouter.post('/', contractsController.create);
contractsRouter.get(
    '/accepted-active',
    ensureAuthenticated,
    acceptedAndActiveContractsController.index,
);
contractsRouter.get(
    '/under-analysis-pendent',
    ensureAuthenticated,
    underAnalysisAndPendentContractsController.index,
);
contractsRouter.get(
    '/:contract_id',
    ensureAuthenticated,
    contractsController.show,
);
contractsRouter.patch(
    '/:contract_id/grade',
    ensureAuthenticated,
    contractsGradeController.update,
);
contractsRouter.patch(
    '/:contract_id/aproove',
    ensureAuthenticated,
    aproovedContractsController.update,
);
contractsRouter.patch(
    '/:contract_id/disaproove',
    ensureAuthenticated,
    disaproovedContractsController.update,
);
contractsRouter.get(
    '/:students/:student_name',
    ensureAuthenticated,
    studentsContractsController.index,
);

export default contractsRouter;
