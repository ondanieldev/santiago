import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProfilesController from '@modules/profiles/infra/http/controllers/ProfilesController';

const profilesController = new ProfilesController();
const profilesRouter = Router();

profilesRouter.use(ensureAuthenticated);
profilesRouter.post('/', profilesController.create);

export default profilesRouter;
