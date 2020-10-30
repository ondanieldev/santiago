import IPayment from './IPayment';

export default interface IDebit {
  id: string;
  value: number;
  paid: boolean;
  description: string;
  dicount_limit_date: Date;
  payment_limit_date: Date;
  discount: number;
  payday?: Date;
  type: 'enrollment' | 'installment';
  contract_id: string;
  payment: IPayment;
}
