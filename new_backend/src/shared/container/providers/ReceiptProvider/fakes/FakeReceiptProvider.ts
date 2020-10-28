import IParseReceiptTemplateDTO from '@shared/container/providers/ReceiptTemplateProvider/dtos/IParseReceiptTemplateDTO';
import IReceiptProvider from '../models/IReceiptProvider';

export default class FakeReceiptProvider implements IReceiptProvider {
    private receipts: IParseReceiptTemplateDTO[] = [];

    public async generate(data: IParseReceiptTemplateDTO): Promise<string> {
        this.receipts.push(data);

        return 'receipt.txt';
    }
}
