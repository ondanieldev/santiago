import { EntityRepository, Repository, getRepository } from 'typeorm';

import Payment from '@modules/payments/infra/typeorm/entities/Payment';
import IPaymentsRepository from '@modules/payments/repositories/IPaymentsRepository';
import ICreatePaymentDTO from '@modules/payments/dtos/ICreatePaymentDTO';

@EntityRepository(Payment)
export default class PaymentsRepository implements IPaymentsRepository {
    private ormRepository: Repository<Payment>;

    constructor() {
        this.ormRepository = getRepository(Payment);
    }

    public async findById(id: string): Promise<Payment | undefined> {
        const payment = await this.ormRepository.findOne({
            where: { id },
        });

        return payment;
    }

    public async findByContract(contract_id: string): Promise<Payment[] | []> {
        const payments = await this.ormRepository
            .createQueryBuilder('payment')
            .select('payment')
            .addSelect('user')
            .leftJoin('payment.user', 'user', 'user.id = payment.user_id')
            .leftJoin('payment.debit', 'debit', 'debit.id = payment.debit_id')
            .where('debit.contract_id = :contract_id', { contract_id })
            .getMany();

        return payments;
    }

    public async create(data: ICreatePaymentDTO): Promise<Payment> {
        const payment = this.ormRepository.create(data);

        await this.ormRepository.save(payment);

        return payment;
    }

    public async save(payment: Payment): Promise<Payment> {
        await this.ormRepository.save(payment);

        return payment;
    }
}
