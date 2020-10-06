import { Router } from 'express';

// import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import EnrollmentsController from '@modules/enrollments/infra/http/controllers/EnrollmentsController';

const enrollmentsController = new EnrollmentsController();
const enrollmentsRouter = Router();

// enrollmentsRouter.use(ensureAuthenticated);
enrollmentsRouter.get('/', enrollmentsController.index);
enrollmentsRouter.post('/', enrollmentsController.create);
enrollmentsRouter.get('/:id', enrollmentsController.get);
enrollmentsRouter.put('/:id', enrollmentsController.update);

export default enrollmentsRouter;
