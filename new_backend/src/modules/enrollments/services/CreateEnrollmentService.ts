import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import IContractsRepository from '@modules/contracts/repositories/IContractsRepository';
import IPersonsRepository from '@modules/persons/repositories/IPersonsRepository';
import IRelationshipsRepository from '@modules/relationships/repositories/IRelationshipsRepository';
import IAgreementsRepository from '@modules/agreements/repositories/IAgreementsRepository';
import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import { ICreateResponsibleDTO } from '@modules/enrollments/dtos/ICreateResponsibleDTO';
import ICreateEnrollmentDTO from '../dtos/ICreateEnrollmentDTO';

interface IResponse {
    student_id: string;
    contract_id: string;
    responsibles_ids: string[];
}

interface IResponsibleWithType extends ICreateResponsibleDTO {
    responsible_type: 'financial' | 'supportive';
}

@injectable()
export default class CreateEnrollmentService {
    constructor(
        @inject('StudentsRepository')
        private studentsRepository: IStudentsRepository,

        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,

        @inject('PersonsRepository')
        private personsRepository: IPersonsRepository,

        @inject('RelationshipsRepository')
        private relationshipsRepository: IRelationshipsRepository,

        @inject('AgreementsRepository')
        private agreementsRepository: IAgreementsRepository,

        @inject('GradesRepository')
        private gradesRepository: IGradesRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) {}

    public async execute({
        student,
        grade_id,
        financial_responsible,
        supportive_responsible,
    }: ICreateEnrollmentDTO): Promise<IResponse> {
        if (financial_responsible.email === supportive_responsible.email) {
            throw new AppError(
                'Os e-mails dos responsáveis precisam ser diferentes!',
            );
        }

        if (financial_responsible.cpf === supportive_responsible.cpf) {
            throw new AppError(
                'Os CPFs dos responsáveis precisam ser diferentes!',
            );
        }

        if (financial_responsible.rg === supportive_responsible.rg) {
            throw new AppError(
                'Os RGs dos responsáveis precisam ser diferentes!',
            );
        }

        const financialCpf = this.checkIfCpfIsValid(financial_responsible.cpf);

        const supportiveCpf = this.checkIfCpfIsValid(
            supportive_responsible.cpf,
        );

        if (!financialCpf || !supportiveCpf) {
            throw new AppError('Os CPFs precisam ser válidos!');
        }

        const responsibles = this.joinResponsiblesIntoAnArray(
            financial_responsible,
            supportive_responsible,
        );

        for (const responsible of responsibles) {
            const responsibleWithTheSameCredentials = await this.personsRepository.findByRgCpfOrEmail(
                {
                    rg: responsible.rg,
                    cpf: responsible.cpf,
                    email: responsible.email,
                },
            );

            if (responsibleWithTheSameCredentials) {
                throw new AppError('CPF, RG ou e-mail já estão em uso!');
            }
        }

        const checkIfGradeExists = await this.gradesRepository.findById(
            grade_id,
        );

        if (!checkIfGradeExists) {
            throw new AppError(
                'Não é possível matrícular um aluno em uma turma inexistente!',
            );
        }

        const createdStudent = await this.studentsRepository.create(student);

        const createdContract = await this.contractsRepository.create({
            grade_id,
            student_id: createdStudent.id,
        });

        const responsibles_ids: string[] = [];

        for (const responsible of responsibles) {
            const createdResponsible = await this.personsRepository.create(
                responsible,
            );

            await this.relationshipsRepository.create({
                kinship: responsible.kinship,
                person_id: createdResponsible.id,
                student_id: createdStudent.id,
            });

            await this.agreementsRepository.create({
                contract_id: createdContract.id,
                person_id: createdResponsible.id,
                responsible_type: responsible.responsible_type,
            });

            responsibles_ids.push(createdResponsible.id);
        }

        const mailTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'notify_create_enrollment.hbs',
        );

        await this.mailProvider.sendMail({
            to: {
                name: financial_responsible.name,
                email: financial_responsible.email,
            },
            subject: '[Santiago] Solicitação de Matrícula',
            body: {
                file: mailTemplate,
                variables: {
                    responsibleName: financial_responsible.name,
                },
            },
        });

        return {
            student_id: createdStudent.id,
            contract_id: createdContract.id,
            responsibles_ids,
        };
    }

    private joinResponsiblesIntoAnArray(
        financial_responsible: ICreateResponsibleDTO,
        supportive_responsible: ICreateResponsibleDTO,
    ): IResponsibleWithType[] {
        const responsibles = [] as IResponsibleWithType[];

        const financialResponsible = Object.assign(financial_responsible, {
            responsible_type: 'financial',
        }) as IResponsibleWithType;

        const supportiveResponsible = Object.assign(supportive_responsible, {
            responsible_type: 'supportive',
        }) as IResponsibleWithType;

        responsibles.push(financialResponsible, supportiveResponsible);

        return responsibles;
    }

    private checkIfCpfIsValid(cpf: string) {
        const chars = cpf.toString().split('');

        if (
            cpf !== '11111111111' &&
            cpf !== '22222222222' &&
            cpf !== '33333333333' &&
            cpf !== '44444444444' &&
            cpf !== '55555555555' &&
            cpf !== '66666666666' &&
            cpf !== '77777777777' &&
            cpf !== '88888888888' &&
            cpf !== '99999999999' &&
            chars.length === 11
        ) {
            const digits = chars.map(char => parseInt(char, 10));

            const getCpfSum = (initial: number) => {
                const cpfSum = digits.reduce((sum, digit, index) => {
                    const mult = initial - index;

                    if (mult >= 2) {
                        return sum + digit * mult;
                    }

                    return sum;
                }, 0);

                return (cpfSum * 10) % 11;
            };

            const firstDigit = getCpfSum(10) === 10 ? 0 : getCpfSum(10);

            const secondDigit = getCpfSum(11) === 10 ? 0 : getCpfSum(11);

            if (digits[9] === firstDigit && digits[10] === secondDigit) {
                return true;
            }
        }

        return false;
    }
}
