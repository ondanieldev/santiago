import { injectable, inject } from 'tsyringe';

import Profile from '@modules/profiles/infra/typeorm/entities/Profile';
import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
export default class IndexProfilesService {
    constructor(
        @inject('ProfilesRepository')
        private profilesRepository: IProfilesRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    async execute(): Promise<Profile[] | []> {
        let profiles = await this.cacheProvider.recovery<Profile[]>('profiles');

        if (!profiles) {
            profiles = await this.profilesRepository.find();

            await this.cacheProvider.register('profiles', profiles);
        }

        return profiles;
    }
}
