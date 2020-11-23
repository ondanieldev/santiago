import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProfilesController from '@modules/profiles/infra/http/controllers/ProfilesController';

const profilesController = new ProfilesController();
const profilesRouter = Router();

profilesRouter.get(
    '/',
    (req, res, next) =>
        ensureAuthenticated(['crud_profiles_permiss', 'crud_users_permiss'])(
            req,
            res,
            next,
        ),
    profilesController.index,
);

profilesRouter.post(
    '/',
    (req, res, next) =>
        ensureAuthenticated(['crud_profiles_permiss'])(req, res, next),
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            create_extra_debits_permiss: Joi.boolean(),
            create_new_enrollments_permiss: Joi.boolean(),
            crud_extra_debits_permiss: Joi.boolean(),
            crud_grades_permiss: Joi.boolean(),
            crud_profiles_permiss: Joi.boolean(),
            crud_users_permiss: Joi.boolean(),
            discharge_payments_permiss: Joi.boolean(),
            pay_debits_permiss: Joi.boolean(),
            validate_enrollments_permiss: Joi.boolean(),
            generate_documents_permiss: Joi.boolean(),
        },
    }),
    profilesController.create,
);

profilesRouter.put(
    '/:profile_id',
    (req, res, next) =>
        ensureAuthenticated(['crud_profiles_permiss'])(req, res, next),
    celebrate({
        [Segments.PARAMS]: {
            profile_id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            create_extra_debits_permiss: Joi.boolean(),
            create_new_enrollments_permiss: Joi.boolean(),
            crud_extra_debits_permiss: Joi.boolean(),
            crud_grades_permiss: Joi.boolean(),
            crud_profiles_permiss: Joi.boolean(),
            crud_users_permiss: Joi.boolean(),
            discharge_payments_permiss: Joi.boolean(),
            pay_debits_permiss: Joi.boolean(),
            validate_enrollments_permiss: Joi.boolean(),
            generate_documents_permiss: Joi.boolean(),
        },
    }),
    profilesController.update,
);

export default profilesRouter;
