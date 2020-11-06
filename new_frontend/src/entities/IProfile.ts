import IPermissions from '../dtos/IPermissions';

export default interface IProfile extends IPermissions {
  id: string;
  name: string;
}
