import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IDebitsRepository from '../repositories/IDebitsRepository';

@injectable()
class DeleteExtraDebitService {
    constructor(
        @inject('DebitsRepository')
        private debitsRepository: IDebitsRepository,
    ) {}

    public async execute(debit_id: string): Promise<void> {
        const debit = await this.debitsRepository.findById(debit_id);

        if (!debit) {
            throw new AppError(
                'não é possível excluir um débito que não existe!',
            );
        }

        if (debit.type !== 'extra') {
            throw new AppError(
                'não é possível excluir um débito que não seja do tipo extra!',
            );
        }

        if (debit.paid) {
            throw new AppError(
                'não é possível excluir um débito que já tenha sido pago!',
            );
        }

        await this.debitsRepository.deleteTypeExtra(debit_id);
    }
}

export default DeleteExtraDebitService;
