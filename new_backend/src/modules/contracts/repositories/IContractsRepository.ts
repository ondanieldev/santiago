import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import ICreateContractDTO from '@modules/contracts/dtos/ICreateContractDTO';

export default interface IContractsRepository {
    create(data: ICreateContractDTO): Promise<Contract>;
    findById(id: string): Promise<Contract | undefined>;
    save(contract: Contract): Promise<Contract>;
    dangerouslyDelete(id: string): Promise<void>;
    findByGradeId(grade_id: string): Promise<Contract[]>;
    findUnderAnalysisAndPendentByGradeId(
        grade_id: string,
    ): Promise<Contract[] | []>;
    findAcceptedAndActiveByGradeId(grade_id: string): Promise<Contract[] | []>;
    findActiveByGradeId(grade_id: string): Promise<Contract[]>;
    findUnderAnalysisAndPendentByStudentName(
        student_name: string,
        grade_id: string,
    ): Promise<Contract[]>;
    findAcceptedAndActiveByStudentName(
        student_name: string,
        grade_id: string,
    ): Promise<Contract[]>;
    findActiveByStudentName(
        student_name: string,
        grade_id: string,
    ): Promise<Contract[]>;
}
