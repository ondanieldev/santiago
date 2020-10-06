import { container } from 'tsyringe';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerInstance<IMailProvider>(
    'MailProvider',
    new EtherealMailProvider(),
);
