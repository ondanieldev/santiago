import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

interface IResponsibleContact {
    name: string;
    email: string;
}

interface IRequest {
    id: string;
    comment?: string;
    responsible_contact?: IResponsibleContact;
}

@injectable()
export default class AprooveOrDisaprooveEnrollmentService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,

        @inject('MailRepository')
        private mailProvider: IMailProvider,
    ) {}

    public async execute({
        id,
        comment,
        responsible_contact,
    }: IRequest): Promise<Contract> {
        const contract = await this.contractsRepository.findById(id);

        if (!contract) {
            throw new AppError(
                'Não é possível reprovar um contrato não existente!',
            );
        }

        Object.assign(contract, { comment, status: 'pendent' });

        await this.contractsRepository.save(contract);

        if (responsible_contact) {
            const templatePath = path.resolve(
                __dirname,
                '..',
                'views',
                'notify_disaproove_enrollment.hbs',
            );

            await this.mailProvider.sendMail({
                to: {
                    name: responsible_contact.name,
                    email: responsible_contact.email,
                },
                subject: '[Santiago] Matrícula Pendente',
                body: {
                    file: templatePath,
                    variables: {
                        responsibleName: responsible_contact.name,
                    },
                },
            });
        }

        return contract;
    }
}
