import IPermissions from './IPermissions';

export default interface IUpdateProfileDTO extends IPermissions {
    id: string;
    name: string;
}
