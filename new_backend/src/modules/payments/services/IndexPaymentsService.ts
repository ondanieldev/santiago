import { injectable, inject } from 'tsyringe';

import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import Payment from '@modules/payments/infra/typeorm/entities/Payment';

@injectable()
export default class IndexPaymentsService {
    constructor(
        @inject('PaymentsRepository')
        private paymentsRepository: IPaymentsRepository,
    ) {}

    public async execute(): Promise<Payment[] | []> {
        const payments = await this.paymentsRepository.findUndischarged();

        const paymentsWithoutPassword = [] as Payment[];

        payments.forEach(payment => {
            const paymentWithoutPassword = payment;

            delete paymentWithoutPassword.user.password;

            paymentsWithoutPassword.push(paymentWithoutPassword);
        });

        return paymentsWithoutPassword;
    }
}
