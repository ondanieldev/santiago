import IParseReceiptTemplateDTO from '@shared/container/providers/ReceiptTemplateProvider/dtos/IParseReceiptTemplateDTO';

export default interface IReceiptProvider {
    generate(data: IParseReceiptTemplateDTO): Promise<string>;
}
