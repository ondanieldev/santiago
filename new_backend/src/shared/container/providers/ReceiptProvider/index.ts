import { container } from 'tsyringe';

import IReceiptProvider from './models/IReceiptProvider';
import DiskReceiptProvider from './implementations/DiskReceiptProvider';

const providers = {
    disk: container.resolve(DiskReceiptProvider),
};

container.registerInstance<IReceiptProvider>('ReceiptProvider', providers.disk);
