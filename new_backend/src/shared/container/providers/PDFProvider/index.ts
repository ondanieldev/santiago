import { container } from 'tsyringe';

import IPDFProvider from './models/IPDFProvider';
import PDFMakePDFProvider from './implementations/PDFMakePDFProvider';

const providers = {
    pdfmake: PDFMakePDFProvider,
};

container.registerSingleton<IPDFProvider>('PDFProvider', providers.pdfmake);
