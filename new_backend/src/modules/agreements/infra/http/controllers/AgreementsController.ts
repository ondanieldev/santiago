import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateAgreementService from '../../../services/CreateAgreementService';

export default class AgreementsController {
    public async create(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { contract_id, person_id, responsible_type } = request.body;

        const createAgreement = container.resolve(CreateAgreementService);

        const agreement = await createAgreement.execute({
            contract_id,
            person_id,
            responsible_type,
        });

        return response.json(agreement);
    }
}
