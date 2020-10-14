import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import PersonsController from '@modules/persons/infra/http/controllers/PersonsController';
import PersonPhotosController from '@modules/persons/infra/http/controllers/PersonPhotosController';

const personsRouter = Router();

const upload = multer(uploadConfig);

const personsController = new PersonsController();
const personPhotosController = new PersonPhotosController();

personsRouter.use(ensureAuthenticated);

personsRouter.post('/', personsController.create);
personsRouter.get('/:cpf', personsController.get);
personsRouter.put('/:person_id', personsController.update);
personsRouter.patch(
    '/photos/:person_id',
    upload.any(),
    personPhotosController.update,
);

export default personsRouter;
