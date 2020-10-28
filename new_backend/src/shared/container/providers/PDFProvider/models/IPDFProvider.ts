import { TDocumentDefinitions } from 'pdfmake/interfaces'; // eslint-disable-line

export default interface IPDFProvider {
    parse(documentDefinition: TDocumentDefinitions): Promise<string>;
}
