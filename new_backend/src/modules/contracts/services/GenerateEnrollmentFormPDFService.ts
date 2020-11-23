import { injectable, inject } from 'tsyringe';
import path from 'path';
import { TDocumentDefinitions } from 'pdfmake/interfaces'; // eslint-disable-line
import { format as ddateFnsFormatDate } from 'date-fns';

import AppError from '@shared/errors/AppError';
import {
    prettierPerson,
    prettierStudent,
    prettierGrade,
} from '@shared/utils/formatFunctions';
import IPDFProvider from '@shared/container/providers/PDFProvider/models/IPDFProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IContractsRepository from '../repositories/IContractsRepository';
import Contract from '../infra/typeorm/entities/Contract';

@injectable()
class GenerateEnrollmentFormPDFService {
    constructor(
        @inject('ContractsRepository')
        private contractsRepository: IContractsRepository,

        @inject('PDFProvider')
        private pdfProvider: IPDFProvider,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute(contract_id: string): Promise<Contract> {
        const contract = await this.contractsRepository.findById(contract_id);

        if (!contract) {
            throw new AppError('o contrato selecionado não existe!');
        }

        const financialResponsible = prettierPerson(
            contract.agreements[0].person,
        );
        const supportiveResponsible = prettierPerson(
            contract.agreements[1].person,
        );
        const student = prettierStudent(contract.student);
        const grade = prettierGrade(contract.grade);

        const imageLogo = path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            'assets',
            'images',
            'logo.png',
        );

        const documentDefinition = {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            pageMargins: [20, 20, 20, 20],
            info: {
                title: 'Ficha de Matrícula',
                author: 'Colégio Santiago',
                subject: 'Ficha de Matrícula',
                keywords: 'Ficha, Matrícula',
                creator: 'Colégio Santiago',
                producer: 'Colégio Santiago',
            },
            styles: {
                heading: {
                    fontSize: 12,
                    bold: true,
                    alignment: 'center',
                },
                subheading: {
                    fontSize: 10,
                    bold: true,
                },
            },
            defaultStyle: {
                font: 'Arial',
                fontSize: 10,
                lineHeight: 1.25,
                alignment: 'justify',
            },
            content: [
                {
                    columns: [
                        {
                            image: imageLogo,
                            width: 65,
                            alignment: 'center',
                        },
                        {
                            text: [
                                {
                                    text: `Ficha de Matrícula - Ano ${grade.year}`,
                                    style: 'heading',
                                },
                                {
                                    text: `\nDocumento Emitido em ${ddateFnsFormatDate(
                                        new Date(),
                                        'dd/MM/yyyy',
                                    )}`,
                                    style: 'subheading',
                                    alignment: 'center',
                                },
                            ],
                        },
                        {
                            text: '',
                            width: 65,
                        },
                    ],
                },
                {
                    text: '\nIdentificação do Aluno',
                    style: 'subheading',
                },
                {
                    columns: [
                        `Nome: ${student.name}`,
                        {
                            text: `Turma: ${grade.name}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Data de Nascimento: ${student.birth_date}`,
                        {
                            text: `Naturalidade: ${student.birth_city}`,
                            alignment: 'center',
                            width: '*',
                        },
                        {
                            text: `UF: ${student.birth_state}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Nacionalidade: ${student.nacionality}`,
                        {
                            text: `Sexo: ${student.gender}`,
                            alignment: 'center',
                            width: '*',
                        },
                        {
                            text: `Cor/Raça: ${student.race}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    text: '\nResponsável Financeiro',
                    style: 'subheading',
                },
                `Nome: ${financialResponsible.name}`,
                `E-mail: ${financialResponsible.email}`,
                `CEP: ${financialResponsible.address_cep}`,
                `Endereço: Rua ${financialResponsible.address_street} - Número ${financialResponsible.address_number} ${financialResponsible.address_complement} - Bairro ${financialResponsible.address_neighborhood} - Cidade ${financialResponsible.address_city}`,
                {
                    columns: [
                        `RG: ${financialResponsible.rg}`,
                        {
                            text: `CPF: ${financialResponsible.cpf}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Aniversário: ${financialResponsible.birth_date}`,
                        {
                            text: `Grau de Instrução: ${financialResponsible.education_level}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Profissão: ${financialResponsible.profission}`,
                        {
                            text: `Telefone Comercial: ${financialResponsible.commercial_phone}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Telefone Fixo: ${financialResponsible.residencial_phone}`,
                        {
                            text: `Telefone Celular: ${financialResponsible.personal_phone}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    text: '\nResponsável Solidário',
                    style: 'subheading',
                },
                `Nome: ${supportiveResponsible.name}`,
                `E-mail: ${supportiveResponsible.email}`,
                `CEP: ${supportiveResponsible.address_cep}`,
                `Endereço: Rua ${supportiveResponsible.address_street} - Número ${supportiveResponsible.address_number} ${supportiveResponsible.address_complement} - Bairro ${supportiveResponsible.address_neighborhood} - Cidade ${supportiveResponsible.address_city}`,
                {
                    columns: [
                        `RG: ${supportiveResponsible.rg}`,
                        {
                            text: `CPF: ${supportiveResponsible.cpf}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Aniversário: ${supportiveResponsible.birth_date}`,
                        {
                            text: `Grau de Instrução: ${supportiveResponsible.education_level}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Profissão: ${supportiveResponsible.profission}`,
                        {
                            text: `Telefone Comercial: ${supportiveResponsible.commercial_phone}`,
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        `Telefone Fixo: ${supportiveResponsible.residencial_phone}`,
                        {
                            text: `Telefone Celular: ${supportiveResponsible.personal_phone}`,
                            alignment: 'right',
                        },
                    ],
                },
                // DADOS COMPLEMENTARES
                {
                    text: '\nDados complementares',
                    style: 'subheading',
                },
                {
                    text: `Escola de Origem: ${
                        student.origin_school || 'Colégio Santiago'
                    }`,
                },
                {
                    text: `${
                        student.ease_relating
                            ? 'O aluno possui facilidade em se relacionar.'
                            : 'O aluno não possui facilidade em se relacionar.'
                    }`,
                },
                {
                    text: `${
                        student.health_plan
                            ? `Plano de Saúde: ${student.health_plan}`
                            : 'Declarado pelo responsável que o aluno não possui plano de saúde.'
                    }`,
                },
                {
                    text: `${
                        student.food_alergy
                            ? `Alergia a Alimentos: ${student.food_alergy}`
                            : 'Declarado pelo responsável que o aluno não possui alergia a alimentos.'
                    }`,
                },
                {
                    text: `${
                        student.medication_alergy
                            ? `Alergia a Remédios: ${student.medication_alergy}`
                            : 'Declarado pelo responsável que o aluno não possui alergia a remédios'
                    }`,
                },
                {
                    text: `${
                        student.health_problem
                            ? `Problema de Saúde: ${student.health_problem}`
                            : 'Declarado pelo responsável que o aluno não possui problema de saúde.'
                    }`,
                },
                {
                    text: `${
                        student.special_necessities
                            ? `Necessidades Especiais: ${student.special_necessities}`
                            : 'Declarado pelo responsável que o aluno não é portador de necessidades especiais.'
                    }`,
                },
                '\nComprometo-me a regularização dos documentos solicitados pelo colégio de acordo com a legislação em vigor. Esta ficha de matrícula é parte do contrato de Prestação de Serviços Educacionais por adesão, assinado entre as partes conforme o ano letivo em estudo.',
                {
                    text: '\n\n______________________________',
                    alignment: 'center',
                },
                {
                    text: 'RESPONSÁVEL FINANCEIRO',
                    alignment: 'center',
                },
                {
                    text: financialResponsible.name.toUpperCase(),
                    alignment: 'center',
                },
                {
                    text: '\nBETIM, MG',
                    alignment: 'center',
                },
                {
                    text: ddateFnsFormatDate(new Date(), 'dd/MM/yyyy'),
                    alignment: 'center',
                },
            ],
        } as TDocumentDefinitions;

        const fileName = await this.pdfProvider.parse(documentDefinition);

        await this.storageProvider.saveFile(fileName);

        if (contract.enrollment_form_document) {
            await this.storageProvider.deleteFile(
                contract.enrollment_form_document,
            );
        }

        Object.assign(contract, { enrollment_form_document: fileName });

        await this.contractsRepository.save(contract);

        return contract;
    }
}

export default GenerateEnrollmentFormPDFService;
