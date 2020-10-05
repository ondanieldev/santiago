import ICreatePersonDTO from '@modules/persons/dtos/ICreatePersonDTO';

export default interface IResponsibles extends ICreatePersonDTO {
    id?: string;
    kinship: string;
}
