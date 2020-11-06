import { injectable, inject } from 'tsyringe';
import { isPast, parseISO, differenceInCalendarMonths } from 'date-fns';

import AppError from '@shared/errors/AppError';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IDebitsRepository from '@modules/debits/repositories/IDebitsRepository';
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import IReceiptProvider from '@shared/container/providers/ReceiptProvider/models/IReceiptProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
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

        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,

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

        const contract = await this.contractsRepository.findById(
            debit.contract_id,
        );

        if (!contract) {
            throw new AppError(
                'não é possível pagar um débito de um contrato inexistente!',
            );
        }

        let paymentValue = Number(debit.value);

        let paymentVariation = 0;

        let compoundVariation = false;

        const parsedDebitDate = parseISO(debit.payment_limit_date.toString());

        if (isPast(parsedDebitDate) && debit.apply_interest_rules) {
            const months = differenceInCalendarMonths(
                new Date(),
                parsedDebitDate,
            );

            compoundVariation = true;

            paymentVariation = 3;

            paymentValue = debit.value * 1.03 ** months;
        } else if (!isPast(parsedDebitDate)) {
            paymentVariation = debit.discount;

            paymentValue = debit.value - (debit.value * debit.discount) / 100;
        }

        const receipt = await this.receiptProvider.generate({
            client: {
                name: contract.agreements[0].person.name,
                cpf: contract.agreements[0].person.cpf,
            },
            operative: {
                name: user.username,
            },
            items: [
                {
                    description: debit.description,
                    base_value: Number(debit.value),
                    true_value: paymentValue,
                    variation: paymentVariation,
                    is_compound_variation: compoundVariation,
                    quantity: 1,
                },
            ],
            method,
        });

        const payment = await this.paymentsRepository.create({
            amount: paymentValue,
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
