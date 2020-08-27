import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProfileService from '@modules/profiles/services/CreateProfileService';

export default class ProfilesController {
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
        } = request.body;

        const createProfile = container.resolve(CreateProfileService);

        const profile = await createProfile.execute({
            name,
            new_enrollment_permiss,
            discharge_payment_permiss,
            pay_debit_permiss,
            validate_enrollment_permiss,
        });

        return response.json(profile);
    }
}
