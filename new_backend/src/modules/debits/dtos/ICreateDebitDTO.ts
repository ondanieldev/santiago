export default interface ICreateDebitDTO {
    value: number;
    description: string;
    payment_limit_date: Date;
    contract_id: string;
    discount?: number;
    type?: 'enrollment' | 'installment' | 'extra';
    apply_interest_rules?: boolean;
}
