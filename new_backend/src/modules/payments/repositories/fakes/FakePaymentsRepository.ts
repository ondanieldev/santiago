import Payment from '@modules/payments/infra/typeorm/entities/Payment';
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';

export default class PaymentsRepository implements IPaymentsRepository {
    private payments: Payment[] = [];

    public async findById(id: string): Promise<Payment | undefined> {
        const payment = this.payments.find(
            findPayment => findPayment.id === id,
        );

        return payment;
    }

    public async findByContract(contract_id: string): Promise<Payment[] | []> {
        const payments = this.payments.filter(
            findPayment => findPayment.debit.contract_id === contract_id,
        );

        return payments;
    }

    public async create(data: ICreatePaymentDTO): Promise<Payment> {
        const payment = new Payment();

        Object.assign(payment, data);

        this.payments.push(payment);

        return payment;
    }

    public async save(data: Payment): Promise<Payment> {
        const payment = this.payments.find(
            findPayment => findPayment.id === data.id,
        );

        Object.assign(payment, data);

        return data;
    }
}
