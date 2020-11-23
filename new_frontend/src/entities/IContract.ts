import IStudent from './IStudent';
import IGrade from './IGrade';

export default interface IContract {
  id: string;
  status: 'underAnalysis' | 'pendent' | 'accepted' | 'active';
  comment: string;
  student_id: string;
  grade_id: string;
  student: IStudent;
  grade: IGrade;
  contract_document?: string;
  checklist_document?: string;
  enrollment_form_document?: string;
}
