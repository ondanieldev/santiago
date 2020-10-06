import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

export default class FakeMailProvider implements IMailProvider {
    private mails: ISendMailDTO[] = [];

    public async sendMail(data: ISendMailDTO): Promise<void> {
        this.mails.push(data);
    }
}
