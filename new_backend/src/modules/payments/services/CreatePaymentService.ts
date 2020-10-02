import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IDebitsRepository from '@modules/debits/repositories/IDebitsRepository';
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import Payment from '@modules/payments/infra/typeorm/entities/Payment';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';

@injectable()
export default class CreatePaymentService {
    constructor(
        @inject('DebitsRepository')
        private debitsRepository: IDebitsRepository,
        @inject('PaymentsRepository')
        private paymentsRepository: IPaymentsRepository,
    ) {}

    public async execute({
        method,
        debit_id,
        user_id,
    }: Omit<ICreatePaymentDTO, 'amount'>): Promise<Payment> {
        const debit = await this.debitsRepository.findById(debit_id);

        if (!debit) {
            throw new AppError('This debit does not exists!');
        }

        if (debit.paid) {
            throw new AppError('This debit is already paid!');
        }

        const payment = this.paymentsRepository.create({
            amount: debit.value,
            debit_id,
            method,
            user_id,
        });

        debit.paid = true;

        await this.debitsRepository.save(debit);

        return payment;
    }
}
