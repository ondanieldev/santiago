import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

container.registerInstance<IStorageProvider>(
    'StorageProvider',
    container.resolve(DiskStorageProvider),
);
