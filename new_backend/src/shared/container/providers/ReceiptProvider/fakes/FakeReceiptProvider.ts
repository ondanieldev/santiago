import IGenerateReceiptDTO from '../dtos/IGenerateReceiptDTO';
import IReceiptProvider from '../models/IReceiptProvider';

export default class FakeReceiptProvider implements IReceiptProvider {
    private receipts: IGenerateReceiptDTO[] = [];

    public async generate(data: IGenerateReceiptDTO): Promise<string> {
        this.receipts.push(data);

        return 'receipt.txt';
    }
}
