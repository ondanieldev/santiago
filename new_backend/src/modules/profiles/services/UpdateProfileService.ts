import { injectable, inject } from 'tsyringe';

import Profile from '@modules/profiles/infra/typeorm/entities/Profile';
import AppError from '@shared/errors/AppError';
import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class UpdateProfileService {
    constructor(
        @inject('ProfilesRepository')
        private profilesRepository: IProfilesRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    async execute({
        id,
        name,
        new_enrollment_permiss,
        validate_enrollment_permiss,
        pay_debit_permiss,
        discharge_payment_permiss,
        crud_grades_permiss,
        crud_profiles_permiss,
        crud_users_permiss,
    }: Omit<Profile, 'users'>): Promise<Profile> {
        const profile = await this.profilesRepository.findById(id);

        if (!profile) {
            throw new AppError('este perfil não existe!');
        }

        const profileWithSameName = await this.profilesRepository.findByName(
            name,
        );

        if (profileWithSameName && profileWithSameName.id !== id) {
            throw new AppError('um perfil com o mesmo nome já existe!');
        }

        profile.name = name;
        profile.new_enrollment_permiss = new_enrollment_permiss;
        profile.validate_enrollment_permiss = validate_enrollment_permiss;
        profile.pay_debit_permiss = pay_debit_permiss;
        profile.discharge_payment_permiss = discharge_payment_permiss;
        profile.crud_grades_permiss = crud_grades_permiss;
        profile.crud_profiles_permiss = crud_profiles_permiss;
        profile.crud_users_permiss = crud_users_permiss;

        await this.profilesRepository.save(profile);

        await this.cacheProvider.invalidate('profiles');

        return profile;
    }
}

export default UpdateProfileService;
