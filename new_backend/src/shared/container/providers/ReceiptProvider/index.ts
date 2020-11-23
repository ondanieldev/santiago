import { container } from 'tsyringe';

import IReceiptProvider from './models/IReceiptProvider';
import PDFReceiptProvider from './implementations/PDFReceiptProvider';

const providers = {
    pdf: container.resolve(PDFReceiptProvider),
};

container.registerInstance<IReceiptProvider>('ReceiptProvider', providers.pdf);
