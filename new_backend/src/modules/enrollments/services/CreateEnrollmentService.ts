import { container, injectable, inject } from 'tsyringe';

import CreateStudentService from '@modules/students/services/CreateStudentService';
import CreateContractService from '@modules/contracts/services/CreateContractService';
import CreatePersonService from '@modules/persons/services/CreatePersonService';
import CreateAgreementService from '@modules/agreements/services/CreateAgreementService';
import CreateRelationshipService from '@modules/relationships/services/CreateRelationshipService';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import IPersonsRepository from '@modules/persons/repositories/IPersonsRepository';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import IAgreementsRepository from '@modules/agreements/repositories/IAgreementsRepository';
import IRelationshipsRepository from '@modules/relationships/repositories/IRelationshipsRepository';
import AppError from '@shared/errors/AppError';
import ICreateEnrollmentDTO from '../dtos/ICreateEnrollmentDTO';

interface IInsert {
    resource: 'student' | 'contract' | 'person' | 'agreement' | 'relationship';
    id: string;
}

interface IResponse {
    financial_id: string;
    supportive_id: string;
    student_id: string;
}

@injectable()
export default class CreateEnrollmentService {
    constructor(
        @inject('StudentsRepository')
        private studentRepository: IStudentsRepository,

        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,

        @inject('PersonsRepository')
        private personsRepository: IPersonsRepository,

        @inject('AgreementsRepository')
        private agreementsRepository: IAgreementsRepository,

        @inject('RelationshipsRepository')
        private relationshipsRepository: IRelationshipsRepository,
    ) {}

    async execute({
        grade,
        student,
        financial_responsible,
        financial_responsible_id,
        supportive_responsible,
        supportive_responsible_id,
    }: ICreateEnrollmentDTO): Promise<IResponse> {
        const inserts = [] as IInsert[];

        if (
            financial_responsible.cpf &&
            supportive_responsible.cpf &&
            (financial_responsible.cpf === supportive_responsible.cpf ||
                financial_responsible.rg === supportive_responsible.rg ||
                financial_responsible.email === supportive_responsible.email)
        ) {
            throw new AppError(
                'CPF, RG e e-mail dos responsáveis não podem ser iguais!',
            );
        }

        try {
            const createStudent = container.resolve(CreateStudentService);
            const createContract = container.resolve(CreateContractService);
            const createPerson = container.resolve(CreatePersonService);
            const createAgreement = container.resolve(CreateAgreementService);
            const createRelationship = container.resolve(
                CreateRelationshipService,
            );

            const createdStudent = await createStudent.execute(student);

            inserts.push({ resource: 'student', id: createdStudent.id });

            const createdContract = await createContract.execute({
                grade_id: grade.id,
                student_id: createdStudent.id,
            });

            inserts.push({ resource: 'contract', id: createdContract.id });

            let financialId = financial_responsible_id;

            if (!financialId) {
                const createdFinancial = await createPerson.execute(
                    financial_responsible,
                );

                financialId = createdFinancial.id;

                inserts.push({
                    resource: 'person',
                    id: createdFinancial.id,
                });
            }

            const createdFinancialAgreement = await createAgreement.execute({
                contract_id: createdContract.id,
                person_id: financialId,
                responsible_type: 'financial',
            });

            inserts.push({
                resource: 'agreement',
                id: createdFinancialAgreement.id,
            });

            const createdFinancialRelationship = await createRelationship.execute(
                {
                    person_id: financialId,
                    student_id: createdStudent.id,
                    kinship: financial_responsible.kinship,
                },
            );

            inserts.push({
                resource: 'relationship',
                id: createdFinancialRelationship.id,
            });

            let supportiveId = supportive_responsible_id;

            if (!supportiveId) {
                const createdSupportive = await createPerson.execute(
                    supportive_responsible,
                );

                supportiveId = createdSupportive.id;

                inserts.push({ resource: 'person', id: createdSupportive.id });
            }

            const createdSupportiveAgreement = await createAgreement.execute({
                contract_id: createdContract.id,
                person_id: supportiveId,
                responsible_type: 'supportive',
            });

            inserts.push({
                resource: 'person',
                id: createdSupportiveAgreement.id,
            });

            const createdSupportiveRelationship = await createRelationship.execute(
                {
                    person_id: supportiveId,
                    student_id: createdStudent.id,
                    kinship: supportive_responsible.kinship,
                },
            );

            inserts.push({
                resource: 'relationship',
                id: createdSupportiveRelationship.id,
            });

            return {
                student_id: createdStudent.id,
                financial_id: financialId,
                supportive_id: supportiveId,
            };
        } catch (err) {
            for (const { id, resource } of inserts) {
                switch (resource) {
                    case 'student':
                        await this.studentRepository.dangerouslyDelete(id);
                        break;
                    case 'contract':
                        await this.contractsRepository.dangerouslyDelete(id);
                        break;
                    case 'person':
                        await this.personsRepository.dangerouslyDelete(id);
                        break;
                    case 'agreement':
                        await this.agreementsRepository.dangerouslyDelete(id);
                        break;
                    case 'relationship':
                        await this.relationshipsRepository.dangerouslyDelete(
                            id,
                        );
                        break;
                    default:
                        break;
                }
            }

            throw err;
        }
    }
}
