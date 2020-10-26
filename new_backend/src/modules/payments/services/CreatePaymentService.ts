import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IDebitsRepository from '@modules/debits/repositories/IDebitsRepository';
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import IReceiptProvider from '@shared/container/providers/ReceiptProvider/models/IReceiptProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Payment from '../infra/typeorm/entities/Payment';

@injectable()
export default class CreatePaymentService {
    constructor(
        @inject('DebitsRepository')
        private debitsRepository: IDebitsRepository,

        @inject('PaymentsRepository')
        private paymentsRepository: IPaymentsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('ReceiptProvider')
        private receiptProvider: IReceiptProvider,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        method,
        debit_id,
        user_id,
    }: Omit<ICreatePaymentDTO, 'amount' | 'receipt'>): Promise<Payment> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'não é possível pagar um débito sem estar logado no sistema!',
            );
        }

        const debit = await this.debitsRepository.findById(debit_id);

        if (!debit) {
            throw new AppError(
                'não é possível pagar um débito que não existe!',
            );
        }

        if (debit.paid) {
            throw new AppError(
                'não é possível pagar um débito que já foi pago!',
            );
        }

        if (debit.type === 'enrollment') {
            throw new AppError(
                'não é possível pagar um débito do tipo matrícula a partir deste serviço!',
            );
        }

        const receipt = await this.receiptProvider.generate([
            {
                item: debit.description,
                value: debit.value,
            },
        ]);

        const payment = await this.paymentsRepository.create({
            amount: debit.value,
            debit_id,
            method,
            user_id,
            receipt,
        });

        Object.assign(debit, { paid: true, payday: new Date() });

        await this.debitsRepository.save(debit);

        await this.cacheProvider.invalidate('undischarged-payments');

        return payment;
    }
}
