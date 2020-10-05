import { v4 } from 'uuid';

import Agreement from '@modules/agreements/infra/typeorm/entities/Agreement';
import IAgreementsRepository from '@modules/agreements/repositories/IAgreementsRepository';
import ICreateAgreementDTO from '@modules/agreements/dtos/ICreateAgreementDTO';

export default class UsersRepository implements IAgreementsRepository {
    private agreements: Agreement[] = [];

    public async findById(id: string): Promise<Agreement | undefined> {
        const agreement = this.agreements.find(
            findAgreement => findAgreement.id === id,
        );

        return agreement;
    }

    public async create(data: ICreateAgreementDTO): Promise<Agreement> {
        const agreement = new Agreement();

        Object.assign(agreement, { id: v4() }, data);

        this.agreements.push(agreement);

        return agreement;
    }
}
