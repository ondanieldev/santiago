import { injectable, inject } from 'tsyringe';

import Profile from '@modules/profiles/infra/typeorm/entities/Profile';
import AppError from '@shared/errors/AppError';
import ICreateProfileDTO from '@modules/profiles/dtos/ICreateProfileDTO';
import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class CreateProfileService {
    constructor(
        @inject('ProfilesRepository')
        private profilesRepository: IProfilesRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    async execute({
        name,
        new_enrollment_permiss,
        validate_enrollment_permiss,
        pay_debit_permiss,
        discharge_payment_permiss,
        crud_grades_permiss,
        crud_profiles_permiss,
        crud_users_permiss,
    }: ICreateProfileDTO): Promise<Profile> {
        const profileWithSameName = await this.profilesRepository.findByName(
            name,
        );

        if (profileWithSameName) {
            throw new AppError(
                'não é possível criar um perfil com o mesmo nome de outro perfil já existente!',
            );
        }

        const profile = await this.profilesRepository.create({
            name,
            new_enrollment_permiss,
            validate_enrollment_permiss,
            pay_debit_permiss,
            discharge_payment_permiss,
            crud_grades_permiss,
            crud_profiles_permiss,
            crud_users_permiss,
        });

        await this.cacheProvider.invalidate('profiles');

        return profile;
    }
}

export default CreateProfileService;
