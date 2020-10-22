import IContract from './IContract';
import IStudent from './IStudent';
import IGrade from './IGrade';
import IPerson from './IPerson';
import IAgreement from './IAgreement';

interface IAgreementWithPerson extends IAgreement {
  person: IPerson;
}

export default interface IEnrollment extends IContract {
  student: IStudent;
  grade: IGrade;
  agreements: IAgreementWithPerson[];
}
