import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { capitalize } from '@shared/utils/formatFunctions';

interface IResponsibleContact {
    name: string;
    email: string;
}

interface IRequest {
    contract_id: string;
    comment?: string;
    responsible_contact?: IResponsibleContact;
}

@injectable()
export default class DisaprooveContractService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        contract_id,
        comment,
        responsible_contact,
    }: IRequest): Promise<Contract> {
        const contract = await this.contractsRepository.findById(contract_id);

        if (!contract) {
            throw new AppError(
                'não é possível reprovar um contrato inexistente!',
            );
        }

        if (contract.status === 'accepted' || contract.status === 'active') {
            throw new AppError(
                'não é possível reprovar um contrato que já foi aceitou ou que já está ativo!',
            );
        }

        Object.assign(contract, { comment, status: 'pendent' });

        await this.contractsRepository.save(contract);

        if (responsible_contact) {
            await this.mailProvider.sendMail({
                to: {
                    name: responsible_contact.name,
                    email: responsible_contact.email,
                },
                subject: '[Santiago] Matrícula Pendente',
                body: {
                    file: 'notify_disaproove_enrollment.hbs',
                    variables: {
                        responsibleName: capitalize(responsible_contact.name),
                        comment:
                            capitalize(comment) || 'Comentário indisponível.',
                    },
                },
            });
        }

        await this.cacheProvider.invalidate(
            `under-analysis-and-pendent-contracts:${contract.grade_id}`,
        );

        return contract;
    }
}
