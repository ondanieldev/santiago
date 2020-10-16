export default interface ICreatePaymentDTO {
    method: 'creditCard' | 'debitCard' | 'cash' | 'check' | 'deposit' | 'slip';
    amount: number;
    debit_id: string;
    user_id: string;
    receipt: string;
}
