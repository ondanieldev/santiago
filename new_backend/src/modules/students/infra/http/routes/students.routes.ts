import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import StudentsPhotosController from '@modules/students/infra/http/controllers/StudentsPhotosController';

const studentsRouter = Router();
const upload = multer(uploadConfig);
const studentsPhotosController = new StudentsPhotosController();

studentsRouter.use(ensureAuthenticated);
studentsRouter.patch(
    '/photos/:id',
    upload.any(),
    studentsPhotosController.update,
);

export default studentsRouter;
