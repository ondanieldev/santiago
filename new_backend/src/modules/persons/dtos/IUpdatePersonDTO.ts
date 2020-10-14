import ICreatePersonDTO from './ICreatePersonDTO';

export default interface IUpdatePersonDTO extends ICreatePersonDTO {
    id: string;
}
