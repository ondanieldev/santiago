import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ContractsController from '../controllers/ContractsController';
import ContractsGradeController from '../controllers/ContractsGradeController';
import AproovedContractsController from '../controllers/AproovedContractsController';
import DisaproovedContractsController from '../controllers/DisaproovedContractsController';
import AcceptedAndActiveContractsController from '../controllers/AcceptedAndActiveContractsController';
import UnderAnalysisAndPendentContractsController from '../controllers/UnderAnalysisAndPendentContractsController';

const agreementsRouter = Router();

const contractsController = new ContractsController();
const contractsGradeController = new ContractsGradeController();
const aproovedContractsController = new AproovedContractsController();
const disaproovedContractsController = new DisaproovedContractsController();
const acceptedAndActiveContractsController = new AcceptedAndActiveContractsController();
const underAnalysisAndPendentContractsController = new UnderAnalysisAndPendentContractsController();

agreementsRouter.post('/', contractsController.create);
agreementsRouter.get(
    '/:contract_id',
    ensureAuthenticated,
    contractsController.show,
);
agreementsRouter.patch(
    'grade/:contract_id',
    ensureAuthenticated,
    contractsGradeController.update,
);
agreementsRouter.patch(
    'aproove/:contract_id',
    ensureAuthenticated,
    aproovedContractsController.update,
);
agreementsRouter.patch(
    'disaproove/:contract_id',
    ensureAuthenticated,
    disaproovedContractsController.update,
);
agreementsRouter.get(
    '/accepted-active',
    ensureAuthenticated,
    acceptedAndActiveContractsController.index,
);
agreementsRouter.get(
    '/under-analysis-pendent',
    ensureAuthenticated,
    underAnalysisAndPendentContractsController.index,
);

export default agreementsRouter;
