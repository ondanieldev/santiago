import IProfile from './IProfile';

export default interface IUser {
  id: string;
  username: string;
  profile_id: string;
  profile: IProfile;
}
