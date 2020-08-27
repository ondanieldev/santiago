import Profile from '@modules/profiles/infra/typeorm/entities/Profile';
import ICreateProfileDTO from '@modules/profiles/dtos/ICreateProfileDTO';

export default interface IProfilesRepository {
    findByName(name: string): Promise<Profile | undefined>;
    create(data: ICreateProfileDTO): Promise<Profile>;
}
