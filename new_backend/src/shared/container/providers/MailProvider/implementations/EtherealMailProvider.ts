import { injectable, inject } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';

import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class FakeMailProvider implements IMailProvider {
    private transporter: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
        nodemailer.createTestAccount((err, account) => {
            this.transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });
        });
    }

    public async sendMail({
        body,
        subject,
        to,
        from,
    }: ISendMailDTO): Promise<void> {
        const info = await this.transporter.sendMail({
            to: {
                name: to.name,
                address: to.email,
            },
            from: {
                name: from?.name || 'Colégio Santiago',
                address: from?.email || 'contato@colegiosantiago.com.br',
            },
            subject,
            html: await this.mailTemplateProvider.parse(body),
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
}
