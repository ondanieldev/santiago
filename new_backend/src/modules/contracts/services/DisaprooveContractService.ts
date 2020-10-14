import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

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

        @inject('MailRepository')
        private mailProvider: IMailProvider,
    ) {}

    public async execute({
        contract_id,
        comment,
        responsible_contact,
    }: IRequest): Promise<Contract> {
        const contract = await this.contractsRepository.findById(contract_id);

        if (!contract) {
            throw new AppError(
                'Não é possível reprovar um contrato inexistente!',
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
                        responsibleName: responsible_contact.name,
                    },
                },
            });
        }

        return contract;
    }
}
