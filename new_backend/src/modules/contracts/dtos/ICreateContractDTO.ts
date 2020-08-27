export default interface ICreateContractDTO {
    student_id: string;
    grade_id: string;
    status: 'underAnalysis' | 'pendent' | 'accepted' | 'active';
}
