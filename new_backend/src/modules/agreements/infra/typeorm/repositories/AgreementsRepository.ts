import { Repository, getRepository, EntityRepository } from 'typeorm';

import Agreement from '@modules/agreements/infra/typeorm/entities/Agreement';
import IAgreementsRepository from '@modules/agreements/repositories/IAgreementsRepository';
import ICreateAgreementDTO from '@modules/agreements/dtos/ICreateAgreementDTO';

@EntityRepository(Agreement)
export default class UsersRepository implements IAgreementsRepository {
    private ormRepository: Repository<Agreement>;

    constructor() {
        this.ormRepository = getRepository(Agreement);
    }

    public async findById(id: string): Promise<Agreement | undefined> {
        const agreement = await this.ormRepository.findOne({
            where: { id },
            relations: ['person'],
        });

        return agreement;
    }

    public async create(data: ICreateAgreementDTO): Promise<Agreement> {
        const agreement = this.ormRepository.create(data);

        await this.ormRepository.save(agreement);

        return agreement;
    }

    public async dangerouslyDelete(id: string): Promise<void> {
        await this.ormRepository
            .createQueryBuilder()
            .delete()
            .where('id = :id', { id })
            .execute();
    }
}
