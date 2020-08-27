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
personsRouter.get('/:cpf', personsController.get);
personsRouter.patch('/photos', upload.any(), personPhotosController.update);

export default personsRouter;
