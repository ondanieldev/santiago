export default interface IDebit {
  id: string;
  value: number;
  paid: boolean;
  description: string;
  initial_date: Date;
  final_date: Date;
  payday?: Date;
  type: 'enrollment' | 'installment';
  contract_id: string;
}
