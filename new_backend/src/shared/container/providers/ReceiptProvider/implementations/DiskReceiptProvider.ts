import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';

import IReceiptProvider from '../models/IReceiptProvider';
import IGenerateReceiptDTO from '../dtos/IGenerateReceiptDTO';

export default class DiskReceiptProvider implements IReceiptProvider {
    private receiptsFolder: string;

    constructor() {
        this.receiptsFolder = path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            '..',
            'tmp',
            'receipts',
        );
    }

    public async generate(data: IGenerateReceiptDTO[]): Promise<string> {
        let text = '';

        data.forEach(({ item, value }) => {
            text += `${item}: ${value}\n`;
        });

        const filename = `${v4()}.txt`;

        const filePath = path.resolve(this.receiptsFolder, filename);

        await fs.promises.writeFile(filePath, text);

        return filename;
    }
}
