import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import ICreateContractDTO from '@modules/contracts/dtos/ICreateContractDTO';

export default interface IContractsRepository {
    create(data: ICreateContractDTO): Promise<Contract>;
    findUnderAnalysisAndPendent(): Promise<Contract[] | []>;
    findAcceptedAndActive(): Promise<Contract[] | []>;
    findById(id: string): Promise<Contract | undefined>;
    save(contract: Contract): Promise<Contract>;
    findByStudentName(student_name: string): Promise<Contract[]>;
    dangerouslyDelete(id: string): Promise<void>;
    findByGradeId(grade_id: string): Promise<Contract[]>;
    findActiveByGradeId(grade_id: string): Promise<Contract[]>;
    findActiveByStudentName(student_name: string): Promise<Contract[]>;
}
