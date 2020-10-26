import { v4 } from 'uuid';

import IRelationshipsRepository from '@modules/relationships/repositories/IRelationshipsRepository';
import Relationship from '@modules/relationships/infra/typeorm/entities/Relationship';
import ICreateRelationshipDTO from '@modules/relationships/dtos/ICreateRelationshipDTO';

export default class RelationshipsRepository
    implements IRelationshipsRepository {
    private relationships: Relationship[] = [];

    public async create(data: ICreateRelationshipDTO): Promise<Relationship> {
        const relationship = new Relationship();

        Object.assign(relationship, { id: v4() }, data);

        this.relationships.push(relationship);

        return relationship;
    }

    public async dangerouslyDelete(id: string): Promise<void> {
        this.relationships.filter(relationship => relationship.id !== id);
    }
}
