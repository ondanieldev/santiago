import ICreateRelationshipDTO from '@modules/relationships/dtos/ICreateRelationshipDTO';
import Relationship from '@modules/relationships/infra/typeorm/entities/Relationship';

export default interface IRelationshipsRepository {
    create(data: ICreateRelationshipDTO): Promise<Relationship>;
    dangerouslyDelete(id: string): Promise<void>;
}
