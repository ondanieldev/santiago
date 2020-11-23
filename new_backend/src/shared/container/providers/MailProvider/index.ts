import { container } from 'tsyringe';

import mailConfig from '@config/mail';
import IMailProvider from './models/IMailProvider';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import AmazonSESMailProvider from './implementations/AmazonSESMailProvider';

const providers = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(AmazonSESMailProvider),
};

container.registerInstance<IMailProvider>(
    'MailProvider',
    providers[mailConfig.driver],
);
