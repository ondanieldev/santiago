import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ContractDocumentsController from '../controllers/ContractDocumentsController';

const contractsDocumentsRoutes = Router();
const contractDocumentsController = new ContractDocumentsController();

contractsDocumentsRoutes.post(
    '/:contract_id/documents',
    (req, res, _) =>
        ensureAuthenticated(['generate_documents_permiss'])(req, res, _),
    celebrate({
        [Segments.PARAMS]: {
            contract_id: Joi.string().uuid().required(),
        },
    }),
    contractDocumentsController.create,
);

export default contractsDocumentsRoutes;
