import { injectable, inject } from 'tsyringe';
import { addMonths } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import IDebitsRepository from '@modules/debits/repositories/IDebitsRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IResponsibleContact {
    name: string;
    email: string;
}

interface IRequest {
    discount?: number;
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

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        contract_id,
        comment,
        responsible_contact,
        discount,
    }: IRequest): Promise<Contract> {
        const contract = await this.contractsRepository.findById(contract_id);

        if (!contract) {
            throw new AppError(
                'não é possível aprovar um contrato inexistente!',
            );
        }

        if (contract.status === 'accepted' || contract.status === 'active') {
            throw new AppError(
                'não é possível aprovar um contrato que já foi aprovado ou que já está ativo!',
            );
        }

        if (discount && discount < 0) {
            throw new AppError('não é possível aplicar um desconto negativo!');
        }

        Object.assign(contract, {
            comment,
            status: 'accepted',
            discount,
        });

        await this.contractsRepository.save(contract);

        await this.debitsRepository.create({
            contract_id,
            description: '1ª parcela - Matrícula',
            payment_limit_date: addMonths(new Date(), 1),
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

        await this.cacheProvider.invalidate(
            'under-analysis-and-pendent-contracts',
        );

        await this.cacheProvider.invalidate('accepted-and-active-contracts');

        return contract;
    }
}
