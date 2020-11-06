import IPayment from './IPayment';

export default interface IDebit {
  id: string;
  value: number;
  paid: boolean;
  description: string;
  payment_limit_date: Date;
  discount: number;
  payday?: Date;
  type: 'enrollment' | 'installment';
  contract_id: string;
  payment: IPayment;
  apply_interest_rules: boolean;
}
