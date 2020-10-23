import { Repository, getRepository, EntityRepository } from 'typeorm';

import IRelationshipsRepository from '@modules/relationships/repositories/IRelationshipsRepository';
import Relationship from '@modules/relationships/infra/typeorm/entities/Relationship';
import ICreateRelationshipDTO from '@modules/relationships/dtos/ICreateRelationshipDTO';

@EntityRepository(Relationship)
export default class RelationshipsRepository
    implements IRelationshipsRepository {
    private ormRepository: Repository<Relationship>;

    constructor() {
        this.ormRepository = getRepository(Relationship);
    }

    public async create(data: ICreateRelationshipDTO): Promise<Relationship> {
        const relationship = this.ormRepository.create(data);

        this.ormRepository.save(relationship);

        return relationship;
    }

    public async dangerouslyDelete(id: string): Promise<void> {
        await this.ormRepository
            .createQueryBuilder()
            .delete()
            .where('id = :id', { id })
            .execute();
    }
}
