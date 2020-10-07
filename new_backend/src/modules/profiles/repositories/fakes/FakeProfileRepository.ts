import { v4 } from 'uuid';

import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';
import Profile from '@modules/profiles/infra/typeorm/entities/Profile';
import ICreateProfileDTO from '@modules/profiles/dtos/ICreateProfileDTO';

export default class ProfilesRepository implements IProfilesRepository {
    private profiles: Profile[] = [];

    public async find(): Promise<Profile[] | []> {
        return this.profiles;
    }

    public async findById(id: string): Promise<Profile | undefined> {
        const profile = this.profiles.find(
            findProfile => findProfile.id === id,
        );

        return profile;
    }

    public async findByName(name: string): Promise<Profile | undefined> {
        const profile = this.profiles.find(
            findProfile => findProfile.name === name,
        );

        return profile;
    }

    public async create(data: ICreateProfileDTO): Promise<Profile> {
        const profile = new Profile();

        Object.assign(profile, data, { id: v4() });

        this.profiles.push(profile);

        return profile;
    }

    public async save(
        data: Omit<Profile, 'users'>,
    ): Promise<Omit<Profile, 'users'>> {
        const profile = this.profiles.find(
            findProfile => findProfile.id === data.id,
        );

        Object.assign(profile, data);

        return data;
    }
}
