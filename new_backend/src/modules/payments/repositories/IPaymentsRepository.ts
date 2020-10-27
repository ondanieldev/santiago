import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';
import Payment from '@modules/payments/infra/typeorm/entities/Payment';

export default interface IPaymentsRepository {
    findById(id: string): Promise<Payment | undefined>;
    findByContract(contract_id: string): Promise<Payment[] | []>;
    create(data: ICreatePaymentDTO): Promise<Payment>;
    save(payment: Payment): Promise<Payment>;
}
