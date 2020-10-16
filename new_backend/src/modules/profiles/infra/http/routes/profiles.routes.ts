import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProfilesController from '@modules/profiles/infra/http/controllers/ProfilesController';

const profilesController = new ProfilesController();
const profilesRouter = Router();

profilesRouter.get(
    '/',
    (req, res, next) => ensureAuthenticated()(req, res, next),
    profilesController.index,
);
profilesRouter.post(
    '/',
    (req, res, next) => ensureAuthenticated()(req, res, next),
    profilesController.create,
);
profilesRouter.put(
    '/:profile_id',
    (req, res, next) => ensureAuthenticated()(req, res, next),
    profilesController.update,
);

export default profilesRouter;
