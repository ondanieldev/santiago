import { injectable, inject } from 'tsyringe';

import Profile from '@modules/profiles/infra/typeorm/entities/Profile';
import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';

@injectable()
export default class IndexProfilesService {
    constructor(
        @inject('ProfilesRepository')
        private profilesRepository: IProfilesRepository,
    ) {}

    async execute(): Promise<Profile[] | []> {
        const profiles = await this.profilesRepository.find();

        return profiles;
    }
}
