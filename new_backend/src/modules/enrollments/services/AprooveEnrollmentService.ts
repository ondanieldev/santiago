import { injectable, inject } from 'tsyringe';
import { addMonths } from 'date-fns';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import IDebitsRepository from '@modules/debits/repositories/IDebitsRepository';
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

        @inject('DebitsRepository')
        private debitsRepository: IDebitsRepository,

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
                'Não é possível aprovar um contrato não existente!',
            );
        }

        Object.assign(contract, { comment, status: 'accepted' });

        await this.contractsRepository.save(contract);

        await this.debitsRepository.create({
            contract_id: id,
            description: 'Primeira parcela - Matrícula',
            initial_date: new Date(),
            final_date: addMonths(new Date(), 1),
            value: contract.grade.value,
        });

        if (responsible_contact) {
            const templatePath = path.resolve(
                __dirname,
                '..',
                'views',
                'notify_aproove_enrollment.hbs',
            );

            await this.mailProvider.sendMail({
                to: {
                    name: responsible_contact.name,
                    email: responsible_contact.email,
                },
                subject: '[Santiago] Matrícula Aprovada',
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
