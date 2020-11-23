import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IContractsRepository from '../repositories/IContractsRepository';
import Contract from '../infra/typeorm/entities/Contract';

interface IRequest {
    contract_id: string;
    grade_id: string;
}

@injectable()
export default class UpdateContractGradeService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,

        @inject('GradesRepository')
        private gradesRepository: IGradesRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        contract_id,
        grade_id,
    }: IRequest): Promise<Contract> {
        const contract = await this.contractsRepository.findById(contract_id);

        if (!contract) {
            throw new AppError(
                'não é possível atualizar a turma de um contrato inexistente!',
            );
        }

        if (
            contract.status !== 'pendent' &&
            contract.status !== 'underAnalysis'
        ) {
            throw new AppError(
                'não é possível atualizar a turma de um contrato que já foi aceito ou já está ativo!',
            );
        }

        const grade = await this.gradesRepository.findById(grade_id);

        if (!grade) {
            throw new AppError(
                'não é possível atualizar o contrato com uma turma inexistente!',
            );
        }

        await this.cacheProvider.invalidate(
            `under-analysis-and-pendent-contracts:${contract.grade_id}`,
        );

        contract.grade = grade;

        await this.contractsRepository.save(contract);

        await this.cacheProvider.invalidate(
            `under-analysis-and-pendent-contracts:${grade_id}`,
        );

        return contract;
    }
}
