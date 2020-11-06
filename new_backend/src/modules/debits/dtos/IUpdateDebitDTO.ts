export default interface IUpdateDebitDTO {
    id: string;
    value: number;
    description: string;
    payment_limit_date: Date;
    discount?: number;
    apply_interest_rules?: boolean;
}
