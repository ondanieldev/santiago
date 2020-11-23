import { Router } from 'express';

import debitsRouter from './debits.routes';
import paymentsRouter from './payments.routes';
import contractsRouter from './contracts.routes';
import contractDocumentsRouter from './contractDocuments.routes';

const contractsRoutes = Router();

contractsRoutes.use('/', contractsRouter);
contractsRoutes.use('/', debitsRouter);
contractsRoutes.use('/', paymentsRouter);
contractsRoutes.use('/', contractDocumentsRouter);

export default contractsRoutes;
