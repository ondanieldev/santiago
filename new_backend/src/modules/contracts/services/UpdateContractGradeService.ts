import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContractsRepository from '../repositories/IContractsRepository';
import Contract from '../infra/typeorm/entities/Contract';

interface IRequest {
    id: string;
    grade_id: string;
}

@injectable()
export default class UpdateContractGradeService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,
    ) {}

    public async execute({ id, grade_id }: IRequest): Promise<Contract> {
        const contract = await this.contractsRepository.findById(id);

        if (!contract) {
            throw new AppError(
                'Não é possível atualizar a turma de um contrato inexistente!',
            );
        }

        contract.grade_id = grade_id;

        await this.contractsRepository.save(contract);

        return contract;
    }
}
