import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import DisaprooveContractService from '../../../services/DisaprooveContractService';

export default class DisaproovedContractsController {
    public async update(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { contract_id } = request.params;

        const { comment, responsible_email, responsible_name } = request.body;

        const disaprooveContract = container.resolve(DisaprooveContractService);

        const contract = await disaprooveContract.execute({
            contract_id,
            comment,
            responsible_contact: {
                email: responsible_email,
                name: responsible_name,
            },
        });

        return response.json(contract);
    }
}
