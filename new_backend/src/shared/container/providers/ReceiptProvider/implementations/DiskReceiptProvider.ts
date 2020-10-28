import fs from 'fs';
import path from 'path';
import { TDocumentDefinitions } from 'pdfmake/interfaces'; // eslint-disable-line
import { injectable, inject } from 'tsyringe';
// import { format as formatDate } from 'date-fns';

import uploadConfig from '@config/upload';
import IReceiptProvider from '../models/IReceiptProvider';
import IPDFProvider from '../../PDFProvider/models/IPDFProvider';
import IGenerateReceiptDTO from '../dtos/IGenerateReceiptDTO';

@injectable()
export default class DiskReceiptProvider implements IReceiptProvider {
    constructor(
        @inject('PDFProvider')
        private pdfProvider: IPDFProvider,
    ) {}

    public async generate({}: IGenerateReceiptDTO): Promise<string> {
        // const date = formatDate(new Date(), 'dd/MM/yy');
        // const hour = formatDate(new Date(), 'HH:mm');

        const documentDefinition = {} as TDocumentDefinitions;

        const filename = await this.pdfProvider.parse(documentDefinition);

        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, filename),
            path.resolve(uploadConfig.uploadFolder, filename),
        );

        return filename;
    }
}
