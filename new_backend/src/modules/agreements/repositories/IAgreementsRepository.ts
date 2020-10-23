import ICreateAgreementDTO from '@modules/agreements/dtos/ICreateAgreementDTO';
import Agreement from '@modules/agreements/infra/typeorm/entities/Agreement';

export default interface IAgreementsRepository {
    findById(id: string): Promise<Agreement | undefined>;
    create(data: ICreateAgreementDTO): Promise<Agreement>;
    dangerouslyDelete(id: string): Promise<void>;
}
