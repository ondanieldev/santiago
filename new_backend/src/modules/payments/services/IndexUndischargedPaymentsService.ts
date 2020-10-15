import { injectable, inject } from 'tsyringe';

import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import Payment from '@modules/payments/infra/typeorm/entities/Payment';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
export default class IndexUndischargedPaymentsService {
    constructor(
        @inject('PaymentsRepository')
        private paymentsRepository: IPaymentsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(): Promise<Payment[] | []> {
        let payments = await this.cacheProvider.recovery<Payment[]>(
            'undischarged-payments',
        );

        if (!payments) {
            payments = await this.paymentsRepository.findUndischarged();

            await this.cacheProvider.register(
                'undischarged-payments',
                payments,
            );
        }

        return payments;
    }
}
