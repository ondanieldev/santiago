import ICreateStudentDTO from '@modules/students/dtos/ICreateStudentDTO';
import {
    ICreateResponsibleDTO,
} from '@modules/enrollments/dtos/ICreateResponsibleDTO';

export default interface ICreateEnrollmentDTO {
    student: ICreateStudentDTO;
    grade_id: string;
    financial_responsible: ICreateResponsibleDTO;
    supportive_responsible: ICreateResponsibleDTO;
}
}
