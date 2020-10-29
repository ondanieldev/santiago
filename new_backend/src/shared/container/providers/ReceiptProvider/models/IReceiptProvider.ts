import IGenerateReceiptDTO from '../dtos/IGenerateReceiptDTO';

export default interface IReceiptProvider {
    generate(data: IGenerateReceiptDTO): Promise<string>;
}
