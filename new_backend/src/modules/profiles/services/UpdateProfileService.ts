import { injectable, inject } from 'tsyringe';

import Profile from '@modules/profiles/infra/typeorm/entities/Profile';
import AppError from '@shared/errors/AppError';
import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUpdateProfileDTO from '../dtos/IUpdateProfileDTO';

@injectable()
class UpdateProfileService {
    constructor(
        @inject('ProfilesRepository')
        private profilesRepository: IProfilesRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    async execute(data: IUpdateProfileDTO): Promise<Profile> {
        const profile = await this.profilesRepository.findById(data.id);

        if (!profile) {
            throw new AppError(
                'não é possível atualizar os dados de um perfil inexistente!',
            );
        }

        const profileWithSameName = await this.profilesRepository.findByName(
            data.name,
        );

        if (profileWithSameName && profileWithSameName.id !== data.id) {
            throw new AppError(
                'não é possível atualizar um perfil com o mesmo nome de outro!',
            );
        }

        Object.assign(profile, { ...data });

        await this.profilesRepository.save(profile);

        await this.cacheProvider.invalidate('profiles');

        return profile;
    }
}

export default UpdateProfileService;
