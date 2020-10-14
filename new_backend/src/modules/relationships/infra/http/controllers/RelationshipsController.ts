import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRelationshipService from '../../../services/CreateRelationshipService';

export default class RelationshipsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { kinship, person_id, student_id } = request.body;

        const createRelationship = container.resolve(CreateRelationshipService);

        const relationship = await createRelationship.execute({
            kinship,
            person_id,
            student_id,
        });

        return response.json(relationship);
    }
}
