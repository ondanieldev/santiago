export default interface IDischarge {
  id: string;
  receipt: string;
  receipt_url: string;
  created_at: Date;
  payment_id: string;
  user_id: string;
}
