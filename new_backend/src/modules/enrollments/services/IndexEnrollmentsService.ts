import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

interface IRequestDTO {
    debitsOrValidate: string;
    limit: number;
    page: number;
}

interface IResponseDTO {
    contracts: Contract[] | [];
    pagination: number;
}

@injectable()
export default class IndexEnrollmentsService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,
    ) {}

    public async execute({
        debitsOrValidate,
        limit,
        page,
    }: IRequestDTO): Promise<IResponseDTO> {
        const whereStatus = [] as {
            status: 'underAnalysis' | 'pendent' | 'accepted' | 'active';
        }[];

        if (
            debitsOrValidate !== 'AprooveOrDisaproove' &&
            debitsOrValidate !== 'CheckForDebits'
        ) {
            throw new AppError('Tipo de indexão não definida!');
        }

        if (limit <= 0) {
            throw new AppError('Limite inválido!');
        }

        if (page <= 0) {
            throw new AppError('Página inválida!');
        }

        if (debitsOrValidate === 'AprooveOrDisaproove') {
            whereStatus.push({
                status: 'pendent',
            });
            whereStatus.push({
                status: 'underAnalysis',
            });
        } else if (debitsOrValidate === 'CheckForDebits') {
            whereStatus.push({
                status: 'accepted',
            });
            whereStatus.push({
                status: 'active',
            });
        }

        const { contracts, pagination } = await this.contractsRepository.find({
            limit,
            page,
            whereStatus,
        });

        return { contracts, pagination };
    }
}
