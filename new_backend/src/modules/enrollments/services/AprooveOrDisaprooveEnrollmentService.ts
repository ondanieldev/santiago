import { container, injectable, inject } from 'tsyringe';
import { addMonths } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import CreateDebitService from '@modules/debits/services/CreateDebitService';

interface IRequest {
    id: string;
    aproove: boolean;
    comment: string;
}

@injectable()
export default class AprooveOrDisaprooveEnrollmentService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,
    ) {}

    public async execute({ id, aproove, comment }: IRequest): Promise<void> {
        const contract = await this.contractsRepository.findById(id);

        if (!contract) {
            throw new AppError('This contract does not exists!');
        }

        if (aproove) {
            contract.status = 'accepted';

            const createDebit = container.resolve(CreateDebitService);

            const debitInitialDate = new Date();
            const debitFinalDate = addMonths(debitInitialDate, 1);

            await createDebit.execute({
                contract_id: contract.id,
                description: 'Primeira parcela - Matrícula',
                initial_date: debitInitialDate,
                final_date: debitFinalDate,
                value: contract.grade.value,
            });
        } else {
            contract.status = 'pendent';
        }

        contract.comment = comment;

        await this.contractsRepository.save(contract);
    }
}
