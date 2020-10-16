import fs from 'fs';
import path from 'path';
import { v4 } from 'uuid';

import uploadConfig from '@config/upload';
import IReceiptProvider from '../models/IReceiptProvider';
import IGenerateReceiptDTO from '../dtos/IGenerateReceiptDTO';

export default class DiskReceiptProvider implements IReceiptProvider {
    public async generate(data: IGenerateReceiptDTO[]): Promise<string> {
        let text = '';

        data.forEach(({ item, value }) => {
            text += `${item}: ${value}\n`;
        });

        const filename = `${v4()}.txt`;

        const filePath = path.resolve(uploadConfig.uploadFolder, filename);

        await fs.promises.writeFile(filePath, text, {
            encoding: 'utf-8',
        });

        return filename;
    }
}
