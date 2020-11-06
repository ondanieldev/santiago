import IPermissions from '@modules/profiles/dtos/IPermissions';

interface IUser extends IPermissions {
    id: string;
}

declare global {
    declare namespace Express {
        interface Request {
            user: IUser;
        }
    }
}
