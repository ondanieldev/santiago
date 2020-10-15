import './StorageProvider';

import { container } from 'tsyringe';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import IReceiptProvider from './ReceiptProvider/models/IReceiptProvider';
import DiskReceiptProvider from './ReceiptProvider/implementations/DiskReceiptProvider';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerInstance<IMailTemplateProvider>(
    'MailTemplateProvider',
    container.resolve(HandlebarsMailTemplateProvider),
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(EtherealMailProvider),
);

container.registerInstance<IReceiptProvider>(
    'ReceiptProvider',
    container.resolve(DiskReceiptProvider),
);

container.registerInstance<IHashProvider>(
    'HashProvider',
    container.resolve(BCryptHashProvider),
);
