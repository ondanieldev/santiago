import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

export default class FakeMailProvider implements IMailProvider {
    private transporter: Transporter;

    constructor() {
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
            text: body,
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
}
