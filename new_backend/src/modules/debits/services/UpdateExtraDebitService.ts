import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';
import { isPast } from 'date-fns';

import AppError from '@shared/errors/AppError';
import Debit from '../infra/typeorm/entities/Debit';
import IDebitsRepository from '../repositories/IDebitsRepository';
import IUpdateDebitDTO from '../dtos/IUpdateDebitDTO';

@injectable()
class UpdateExtraDebitService {
    constructor(
        @inject('DebitsRepository')
        private debitsRepository: IDebitsRepository,
    ) {}

    public async execute({
        id,
        description,
        payment_limit_date,
        value,
        discount,
        apply_interest_rules,
    }: IUpdateDebitDTO): Promise<Debit> {
        const debitExists = await this.debitsRepository.findById(id);

        if (!debitExists) {
            throw new AppError(
                'não é possível editar um débito que não existe!',
            );
        }

        if (debitExists.paid) {
            throw new AppError(
                'não é possível editar um débito que já foi pago!',
            );
        }

        if (debitExists.type !== 'extra') {
            throw new AppError(
                'não é possível editar um débito que não seja do tipo extra!',
            );
        }

        if (isPast(payment_limit_date)) {
            throw new AppError(
                'não é possível criar um débito com uma data limite que já passou!',
            );
        }

        if (discount && discount < 0) {
            throw new AppError(
                'não é possível criar um débito com um desconto negativo!',
            );
        }

        if (value < 0) {
            throw new AppError(
                'não é possível criar um débito com um valor negativo!',
            );
        }

        Object.assign(debitExists, {
            description,
            payment_limit_date,
            value,
            discount,
            apply_interest_rules,
        });

        const debit = await this.debitsRepository.save(debitExists);

        return debit;
    }
}

export default UpdateExtraDebitService;
