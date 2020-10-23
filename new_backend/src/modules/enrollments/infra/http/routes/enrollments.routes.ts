import { Router } from 'express';

import EnrollmentsController from '../controllers/EnrollmentsController';

const enrollmentsRouter = Router();

const enrollmentsController = new EnrollmentsController();

enrollmentsRouter.post('/', enrollmentsController.create);

export default enrollmentsRouter;
