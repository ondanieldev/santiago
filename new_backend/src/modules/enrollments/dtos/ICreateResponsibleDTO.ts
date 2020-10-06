import ICreatePersonDTO from '@modules/persons/dtos/ICreatePersonDTO';

export interface ICreateResponsibleDTO extends ICreatePersonDTO {
    kinship: string;
}

export interface ICreateResponsibleWithIdDTO {
    id: string;
    kinship: string;
}
