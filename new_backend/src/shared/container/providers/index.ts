import { container } from 'tsyringe';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerInstance<IMailTemplateProvider>(
    'MailTemplateProvider',
    container.resolve(HandlebarsMailTemplateProvider),
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(EtherealMailProvider),
);

container.registerInstance<IStorageProvider>(
    'StorageProvider',
    container.resolve(DiskStorageProvider),
);
