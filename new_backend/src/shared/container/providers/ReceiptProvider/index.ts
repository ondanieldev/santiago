import { container } from 'tsyringe';

import IReceiptProvider from './models/IReceiptProvider';
import DiskReceiptProvider from './implementations/DiskReceiptProvider';

const providers = {
    disk: DiskReceiptProvider,
};

container.registerSingleton<IReceiptProvider>(
    'ReceiptProvider',
    providers.disk,
);
