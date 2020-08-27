import { injectable, inject } from 'tsyringe';

import IAgreementsRepository from '@modules/agreements/repositories/IAgreementsRepository';
import ICreateAgreementDTO from '@modules/agreements/dtos/ICreateAgreementDTO';
import Agreement from '@modules/agreements/infra/typeorm/entities/Agreement';

@injectable()
export default class CreateAgreementService {
    constructor(
        @inject('AgreementsRepository')
        private agreementsRepository: IAgreementsRepository,
    ) {}

    public async execute(data: ICreateAgreementDTO): Promise<Agreement> {
        const agreement = await this.agreementsRepository.create(data);

        return agreement;
    }
}
