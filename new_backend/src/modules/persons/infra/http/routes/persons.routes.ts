import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import PersonsController from '@modules/persons/infra/http/controllers/PersonsController';
import PersonPhotosController from '@modules/persons/infra/http/controllers/PersonPhotosController';

const personsRouter = Router();

const upload = multer(uploadConfig.multer);

const personsController = new PersonsController();
const personPhotosController = new PersonPhotosController();

// personsRouter.post('/', personsController.create);

personsRouter.get(
    '/:cpf',
    (req, res, next) =>
        ensureAuthenticated(['create_new_enrollments_permiss'])(req, res, next),
    personsController.show,
);

personsRouter.put(
    '/:person_id',
    (req, res, next) =>
        ensureAuthenticated(['validate_enrollments_permiss'])(req, res, next),
    personsController.update,
);

personsRouter.patch(
    '/photos/:person_id',
    (req, res, next) =>
        ensureAuthenticated([
            'create_new_enrollments_permiss',
            'validate_enrollments_permiss',
        ])(req, res, next),
    upload.any(),
    personPhotosController.update,
);

export default personsRouter;
