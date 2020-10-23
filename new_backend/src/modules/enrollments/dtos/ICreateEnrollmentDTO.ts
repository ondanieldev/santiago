import ICreateStudentDTO from '@modules/students/dtos/ICreateStudentDTO';
import ICreatePersonDTO from '@modules/persons/dtos/ICreatePersonDTO';

interface IGradeDTO {
    id: string;
}

interface ICreateResponsibleDTO extends ICreatePersonDTO {
    kinship: string;
}

export default interface ICreateEnrollmentDTO {
    grade: IGradeDTO;
    student: ICreateStudentDTO;
    financial_responsible: ICreateResponsibleDTO;
    financial_responsible_id?: string;
    supportive_responsible: ICreateResponsibleDTO;
    supportive_responsible_id?: string;
}
