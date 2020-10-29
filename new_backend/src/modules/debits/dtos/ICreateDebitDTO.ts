export default interface ICreateDeebitDTO {
    value: number;
    description: string;
    payment_limit_date: Date;
    contract_id: string;
    discount?: number;
    type?: 'enrollment' | 'installment';
}
