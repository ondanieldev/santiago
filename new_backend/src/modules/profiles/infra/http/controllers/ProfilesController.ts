import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IndexProfilesService from '@modules/profiles/services/IndexProfilesService';
import CreateProfileService from '@modules/profiles/services/CreateProfileService';
import UpdateProfileService from '@modules/profiles/services/UpdateProfileService';

export default class ProfilesController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const indexProfiles = container.resolve(IndexProfilesService);

        const profiles = await indexProfiles.execute();

        return response.json(profiles);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            name,
            new_enrollment_permiss,
            discharge_payment_permiss,
            pay_debit_permiss,
            validate_enrollment_permiss,
            crud_grades_permiss,
            crud_profiles_permiss,
            crud_users_permiss,
        } = request.body;

        const createProfile = container.resolve(CreateProfileService);

        const profile = await createProfile.execute({
            name,
            new_enrollment_permiss,
            discharge_payment_permiss,
            pay_debit_permiss,
            validate_enrollment_permiss,
            crud_grades_permiss,
            crud_profiles_permiss,
            crud_users_permiss,
        });

        return response.json(profile);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            name,
            new_enrollment_permiss,
            discharge_payment_permiss,
            pay_debit_permiss,
            validate_enrollment_permiss,
            crud_grades_permiss,
            crud_profiles_permiss,
            crud_users_permiss,
        } = request.body;

        const { profile_id } = request.params;

        const updateProfile = container.resolve(UpdateProfileService);

        const profile = await updateProfile.execute({
            id: profile_id,
            name,
            new_enrollment_permiss,
            discharge_payment_permiss,
            pay_debit_permiss,
            validate_enrollment_permiss,
            crud_grades_permiss,
            crud_profiles_permiss,
            crud_users_permiss,
        });

        return response.json(profile);
    }
}
