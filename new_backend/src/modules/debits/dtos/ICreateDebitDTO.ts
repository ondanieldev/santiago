export default interface ICreateDeebitDTO {
    value: number;
    description: string;
    initial_date: Date;
    final_date: Date;
    contract_id: string;
    type?: 'enrollment' | 'installment';
}
