import { injectable, inject } from 'tsyringe';
import { addMonths } from 'date-fns';

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
    contract_id: string;
    comment?: string;
    responsible_contact?: IResponsibleContact;
}

@injectable()
export default class AprooveContractService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,

        @inject('DebitsRepository')
        private debitsRepository: IDebitsRepository,

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
                'Não é possível aprovar um contrato inexistente!',
            );
        }

        Object.assign(contract, { comment, status: 'accepted' });

        await this.contractsRepository.save(contract);

        await this.debitsRepository.create({
            contract_id,
            description: 'Primeira parcela - Matrícula',
            initial_date: new Date(),
            final_date: addMonths(new Date(), 1),
            value: contract.grade.value,
            type: 'enrollment',
        });

        if (responsible_contact) {
            await this.mailProvider.sendMail({
                to: {
                    name: responsible_contact.name,
                    email: responsible_contact.email,
                },
                subject: '[Santiago] Matrícula Aprovada',
                body: {
                    file: 'notify_aproove_enrollment.hbs',
                    variables: {
                        responsibleName: responsible_contact.name,
                    },
                },
            });
        }

        return contract;
    }
}
