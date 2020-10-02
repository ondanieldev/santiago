import Profile from '@modules/profiles/infra/typeorm/entities/Profile';
import ICreateProfileDTO from '@modules/profiles/dtos/ICreateProfileDTO';

export default interface IProfilesRepository {
    find(): Promise<Profile[] | []>;
    findById(id: string): Promise<Profile | undefined>;
    findByName(name: string): Promise<Profile | undefined>;
    create(data: ICreateProfileDTO): Promise<Profile>;
    save(data: Profile): Promise<Omit<Profile, 'users'>>;
}
