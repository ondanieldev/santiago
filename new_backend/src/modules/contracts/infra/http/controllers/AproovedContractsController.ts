import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import AprooveContractService from '../../../services/AprooveContractService';

export default class AproovedContractsController {
    public async update(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { contract_id } = request.params;

        const {
            comment,
            responsible_email,
            responsible_name,
            discount,
        } = request.body;

        const aprooveContract = container.resolve(AprooveContractService);

        const contract = await aprooveContract.execute({
            contract_id,
            comment,
            discount,
            responsible_contact: {
                email: responsible_email,
                name: responsible_name,
            },
        });

        return response.json(contract);
    }
}
