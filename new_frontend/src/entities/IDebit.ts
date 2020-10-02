export default interface IDebit {
  id: string;
  value: number;
  paid: boolean;
  description: string;
  initial_date: Date;
  final_date: Date;
  contract_id: string;
}
