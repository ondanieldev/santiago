import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Discharge from '@modules/discharges/infra/typeorm/entities/Discharge';
import ICreateDischargeDTO from '@modules/discharges/dtos/ICreateDischargeDTO';
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import IDischargesRepository from '@modules/discharges/repositories/IDischargesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
export default class CreateDischargeService {
    constructor(
        @inject('PaymentsRepository')
        private paymentsRepository: IPaymentsRepository,

        @inject('DischargesRepository')
        private dischargesRepository: IDischargesRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        payment_id,
        user_id,
    }: Omit<ICreateDischargeDTO, 'receipt'>): Promise<Discharge> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError(
                'não é possível receber um pagamento sem estar logado no sistema!',
            );
        }

        const payment = await this.paymentsRepository.findById(payment_id);

        if (!payment) {
            throw new AppError(
                'não é possível recebr um pagamento inexistente!',
            );
        }

        if (payment.discharged) {
            throw new AppError(
                'não é possível receber um pagamento que já foi recebido!',
            );
        }

        const discharge = this.dischargesRepository.create({
            payment_id,
            user_id,
            receipt: payment.receipt,
        });

        Object.assign(payment, { discharged: true, discharge_day: new Date() });

        await this.paymentsRepository.save(payment);

        return discharge;
    }
}
