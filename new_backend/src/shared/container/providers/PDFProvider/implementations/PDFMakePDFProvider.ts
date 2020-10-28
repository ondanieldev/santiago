import PDFMake from 'pdfmake';
import path from 'path';
import fs from 'fs';
import { v4 } from 'uuid';
import { TDocumentDefinitions } from 'pdfmake/interfaces'; // eslint-disable-line

import uploadConfig from '@config/upload';
import IPDFProvider from '../models/IPDFProvider';

export default class PDFMakePDFProvider implements IPDFProvider {
    public async parse(
        documentDefinition: TDocumentDefinitions,
    ): Promise<string> {
        const fonts = {
            Arial: {
                normal: path.resolve(__dirname, '..', 'fonts', 'arial.ttf'),
                bold: path.resolve(__dirname, '..', 'fonts', 'arialbd.ttf'),
            },
        };

        const printer = new PDFMake(fonts);

        const fileHash = v4();

        const filename = `${fileHash}.pdf`;

        const filePath = path.resolve(uploadConfig.tmpFolder, filename);

        const pdfDoc = printer.createPdfKitDocument(documentDefinition);

        pdfDoc.pipe(fs.createWriteStream(filePath));

        pdfDoc.end();

        return filename;
    }
}
