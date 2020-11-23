import { TDocumentDefinitions } from 'pdfmake/interfaces'; // eslint-disable-line
import { injectable, inject } from 'tsyringe';
import { format as formatDate } from 'date-fns';

import {
    formatPaymentMethod,
    returnCPFWithMask,
    returnFirstName,
    formatCoinBRL,
    capitalize,
} from '@shared/utils/formatFunctions';
import IReceiptProvider from '../models/IReceiptProvider';
import IPDFProvider from '../../PDFProvider/models/IPDFProvider';
import IGenerateReceiptDTO from '../dtos/IGenerateReceiptDTO';

@injectable()
export default class DiskReceiptProvider implements IReceiptProvider {
    constructor(
        @inject('PDFProvider')
        private pdfProvider: IPDFProvider,
    ) {}

    public async generate({
        client,
        items,
        operative,
        method,
    }: IGenerateReceiptDTO): Promise<string> {
        const date = formatDate(new Date(), 'dd/MM/yy');

        const hour = formatDate(new Date(), 'HH:mm');

        let totalValue = 0;

        const itemsArray = items.map(item => {
            const subtotal = item.quantity * item.true_value;

            totalValue += subtotal;

            return [
                capitalize(item.description.toString()),
                item.quantity.toString(),
                formatCoinBRL(item.base_value),
                item.is_compound_variation
                    ? `${item.variation}p. a.m.`
                    : `${item.variation}p.`,
                formatCoinBRL(subtotal),
            ];
        });

        const itemsArrayCopy = items.map(item => {
            const subtotal = item.quantity * item.true_value;

            return [
                item.description.toString(),
                item.quantity.toString(),
                formatCoinBRL(item.base_value),
                item.is_compound_variation
                    ? `${item.variation}p. a.m.`
                    : `${item.variation}p.`,
                formatCoinBRL(subtotal),
            ];
        });

        const itemsTable = {
            layout: 'noBorders',
            table: {
                body: [
                    ['Desc.', 'Qtd.', 'V.Un.', 'Var.', 'Subtotal'],
                    ...itemsArray,
                ],
                widths: ['*', 40, 50, 40, '*'],
            },
        };

        const itemsTableCopy = {
            layout: 'noBorders',
            table: {
                body: [
                    ['Desc.', 'Qtd.', 'V.Un.', 'Var.', 'Subtotal'],
                    ...itemsArrayCopy,
                ],
                widths: ['*', 40, 50, 40, '*'],
            },
        };

        const documentDefinition = {
            pageSize: 'A6',
            pageOrientation: 'portrait',
            pageMargins: [0, 0, 0, 0],
            info: {
                title: 'Recibo',
                author: 'Colégio Santiago',
                subject: 'Recibo',
                keywords: 'Recibo',
                creator: 'Colégio Santiago',
                producer: 'Colégio Santiago',
            },
            defaultStyle: {
                font: 'Bank',
                fontSize: 10,
                lineHeight: 1.25,
                alignment: 'center',
            },
            content: [
                '*******************************************',
                'COLEGIO SANTIAGO',
                'RUA RIO GRANDE DO SUL, 863',
                'BAIRRO ESPIRITO SANTO - MG',
                '-------------------------------------------',
                {
                    text: [
                        { text: 'CEP: 32671-686 ', alignment: 'left' },
                        { text: 'TEL: (31) 3595-2156', alignment: 'right' },
                    ],
                },
                { text: 'CNPJ: 09.293.734.110', alignment: 'left' },
                {
                    text: `RESPONSÁVEL FIN.: ${capitalize(
                        returnFirstName(client.name),
                    )}`,
                    alignment: 'left',
                },
                {
                    text: `CPF: ${returnCPFWithMask(client.cpf)}`,
                    alignment: 'left',
                },
                '-------------------------------------------',
                {
                    text: `RECEBIDO POR: ${capitalize(
                        returnFirstName(operative.name),
                    )}`,
                    alignment: 'left',
                },
                {
                    columns: [
                        { text: `DATA: ${date} `, alignment: 'left' },
                        { text: `HORA: ${hour}`, alignment: 'right' },
                    ],
                },
                '==================DÉBITOS==================',
                itemsTable,
                '-------------------------------------------',
                {
                    columns: [
                        { text: 'Total do pagamento: ', alignment: 'left' },
                        {
                            text: formatCoinBRL(totalValue),
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        { text: 'Forma de pagamento: ', alignment: 'left' },
                        {
                            text: formatPaymentMethod(method),
                            alignment: 'right',
                        },
                    ],
                },
                '===========================================',
                '* Este ticket não é documento fiscal *',
                'Deus vos abençoe',
                '*******************************************',
                '*******************************************',
                'COLEGIO SANTIAGO',
                'RUA RIO GRANDE DO SUL, 863',
                'BAIRRO ESPIRITO SANTO - MG',
                '-------------------------------------------',
                {
                    text: [
                        { text: 'CEP: 32671-686 ', alignment: 'left' },
                        { text: 'TEL: (31) 3595-2156', alignment: 'right' },
                    ],
                },
                { text: 'CNPJ: 09.293.734.110', alignment: 'left' },
                {
                    text: `RESPONSÁVEL FIN.: ${capitalize(
                        returnFirstName(client.name),
                    )}`,
                    alignment: 'left',
                },
                {
                    text: `CPF: ${returnCPFWithMask(client.cpf)}`,
                    alignment: 'left',
                },
                '-------------------------------------------',
                {
                    text: `RECEBIDO POR: ${capitalize(
                        returnFirstName(operative.name),
                    )}`,
                    alignment: 'left',
                },
                {
                    columns: [
                        { text: `DATA: ${date} `, alignment: 'left' },
                        { text: `HORA: ${hour}`, alignment: 'right' },
                    ],
                },
                '==================DÉBITOS==================',
                itemsTableCopy,
                '-------------------------------------------',
                {
                    columns: [
                        { text: 'Total do pagamento: ', alignment: 'left' },
                        {
                            text: formatCoinBRL(totalValue),
                            alignment: 'right',
                        },
                    ],
                },
                {
                    columns: [
                        { text: 'Forma de pagamento: ', alignment: 'left' },
                        {
                            text: formatPaymentMethod(method),
                            alignment: 'right',
                        },
                    ],
                },
                '===========================================',
                '* Este ticket não é documento fiscal *',
                'Deus vos abençoe',
                '\n\n',
                'Assinatura de baixa: ______________________',
                '*******************************************',
            ],
        } as TDocumentDefinitions;

        const filename = await this.pdfProvider.parse(documentDefinition);

        return filename;
    }
}
