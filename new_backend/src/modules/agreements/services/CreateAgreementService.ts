import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import IPersonsRepository from '@modules/persons/repositories/IPersonsRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import Agreement from '../infra/typeorm/entities/Agreement';
import ICreateAgreementDTO from '../dtos/ICreateAgreementDTO';
import IAgreementsRepository from '../repositories/IAgreementsRepository';

@injectable()
export default class CreateEnrollmentService {
    constructor(
        @inject('AgreementsRepository')
        private agreementsRepository: IAgreementsRepository,

        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,

        @inject('PersonsRepository')
        private personsRepository: IPersonsRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) {}

    public async execute({
        contract_id,
        person_id,
        responsible_type,
    }: ICreateAgreementDTO): Promise<Agreement> {
        const contract = await this.contractsRepository.findById(contract_id);

        if (!contract) {
            throw new AppError(
                'Não é possível criar um acordo com um contrato inexistente!',
            );
        }

        const person = await this.personsRepository.findById(person_id);

        if (!person) {
            throw new AppError(
                'Não é possível criar um acordo com um responsável inexistente!',
            );
        }

        const agreement = await this.agreementsRepository.create({
            contract_id,
            person_id,
            responsible_type,
        });

        await this.mailProvider.sendMail({
            to: {
                name: person.name,
                email: person.email,
            },
            subject: '[Santiago] Solicitação de Matrícula',
            body: {
                file: 'notify_create_enrollment.hbs',
                variables: {
                    responsibleName: person.name,
                },
            },
        });

        return agreement;
    }
}
