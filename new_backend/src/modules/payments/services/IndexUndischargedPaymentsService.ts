import { injectable, inject } from 'tsyringe';

import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import Payment from '@modules/payments/infra/typeorm/entities/Payment';

@injectable()
export default class IndexUndischargedPaymentsService {
    constructor(
        @inject('PaymentsRepository')
        private paymentsRepository: IPaymentsRepository,
    ) {}

    public async execute(): Promise<Payment[] | []> {
        const payments = await this.paymentsRepository.findUndischarged();

        return payments;
    }
}
