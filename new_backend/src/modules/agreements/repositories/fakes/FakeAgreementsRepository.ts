import { v4 } from 'uuid';

import Agreement from '@modules/agreements/infra/typeorm/entities/Agreement';
import IAgreementsRepository from '@modules/agreements/repositories/IAgreementsRepository';
import ICreateAgreementDTO from '@modules/agreements/dtos/ICreateAgreementDTO';
import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';

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

        Object.assign(agreement, { id: v4() }, data, { person: {} });

        this.agreements.push(agreement);

        const fakeContractsRepository = new FakeContractsRepository();

        const contract = await fakeContractsRepository.findById(
            data.contract_id,
        );

        if (contract) {
            Object.assign(contract, agreement);
            await fakeContractsRepository.save(contract);
        }

        return agreement;
    }

    public async dangerouslyDelete(id: string): Promise<void> {
        this.agreements.filter(agreement => agreement.id !== id);
    }
}
