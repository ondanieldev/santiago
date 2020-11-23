import { injectable, inject } from 'tsyringe';
import SES from 'aws-sdk/clients/ses';

import mailConfig from '@config/mail';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
class AmazonSESMailProvider implements IMailProvider {
    private sesClient: SES;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
        this.sesClient = new SES({
            region: mailConfig.config.ses.region,
        });
    }

    public async sendMail({
        body,
        subject,
        to,
        from,
    }: ISendMailDTO): Promise<void> {
        try {
            await this.sesClient
                .sendEmail({
                    Source: `${from?.name || mailConfig.defaults.from.name} <${
                        from?.email || mailConfig.defaults.from.email
                    }>`,
                    Destination: {
                        ToAddresses: [`${to.name} <${to.email}>`],
                    },
                    Message: {
                        Subject: {
                            Data: subject,
                        },
                        Body: {
                            Html: {
                                Data: await this.mailTemplateProvider.parse(
                                    body,
                                ),
                            },
                        },
                    },
                })
                .promise();
        } catch {}
    }
}

export default AmazonSESMailProvider;
