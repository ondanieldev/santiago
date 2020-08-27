import { injectable, inject } from 'tsyringe';

import IRelationshipsRepository from '@modules/relationships/repositories/IRelationshipsRepository';
import ICreateRelationshipDTO from '@modules/relationships/dtos/ICreateRelationshipDTO';
import Relationship from '@modules/relationships/infra/typeorm/entities/Relationship';

@injectable()
export default class CreateRelationshipService {
    constructor(
        @inject('RelationshipsRepository')
        private relationshipsRepository: IRelationshipsRepository,
    ) {}

    public async execute(data: ICreateRelationshipDTO): Promise<Relationship> {
        const relationship = await this.relationshipsRepository.create(data);

        return relationship;
    }
}
