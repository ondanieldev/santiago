import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import StudentsController from '@modules/students/infra/http/controllers/StudentsController';
import StudentsPhotosController from '@modules/students/infra/http/controllers/StudentsPhotosController';

const studentsRouter = Router();

const upload = multer(uploadConfig.multer);

const studentsController = new StudentsController();
const studentsPhotosController = new StudentsPhotosController();

studentsRouter.post('/', studentsController.create);
studentsRouter.put(
    '/:student_id',
    (req, res, next) => ensureAuthenticated()(req, res, next),
    studentsController.update,
);
studentsRouter.patch(
    '/photos/:student_id',
    upload.any(),
    studentsPhotosController.update,
);

export default studentsRouter;
