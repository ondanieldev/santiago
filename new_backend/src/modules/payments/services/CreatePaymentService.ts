import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Payment from '@modules/payments/infra/typeorm/entities/Payment';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IDebitsRepository from '@modules/debits/repositories/IDebitsRepository';
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';

@injectable()
export default class CreatePaymentService {
    constructor(
        @inject('DebitsRepository')
        private debitsRepository: IDebitsRepository,

        @inject('PaymentsRepository')
        private paymentsRepository: IPaymentsRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        method,
        debit_id,
        user_id,
    }: Omit<ICreatePaymentDTO, 'amount'>): Promise<Payment> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'Não é possível pagar um débito sem estar logado no sistema!',
            );
        }

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
