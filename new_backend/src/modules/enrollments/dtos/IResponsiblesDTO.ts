import ICreatePersonDTO from '@modules/persons/dtos/ICreatePersonDTO';

export default interface IResponsibles extends ICreatePersonDTO {
    kinship: string;
    responsible_type: 'financial' | 'supportive' | 'educational';
}
