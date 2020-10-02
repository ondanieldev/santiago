import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import IDischargesRepository from '@modules/discharges/repositories/IDischargesRepository';
import Discharge from '@modules/discharges/infra/typeorm/entities/Discharge';
import ICreateDischargeDTO from '@modules/discharges/dtos/ICreateDischargeDTO';

@injectable()
export default class CreateDischargeService {
    constructor(
        @inject('PaymentsRepository')
        private paymentsRepository: IPaymentsRepository,
        @inject('DischargesRepository')
        private dischargesRepository: IDischargesRepository,
    ) {}

    public async execute({
        payment_id,
        user_id,
    }: ICreateDischargeDTO): Promise<Discharge> {
        const payment = await this.paymentsRepository.findById(payment_id);

        if (!payment) {
            throw new AppError('This payment does not exists!');
        }

        if (payment.discharged) {
            throw new AppError('This payment is already discharged!');
        }

        const discharge = this.dischargesRepository.create({
            payment_id,
            user_id,
        });

        payment.discharged = true;

        await this.paymentsRepository.save(payment);

        return discharge;
    }
}
