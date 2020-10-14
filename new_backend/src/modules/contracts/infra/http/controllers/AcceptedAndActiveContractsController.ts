import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import IndexAcceptedAndActiveContractsService from '../../../services/IndexAcceptedAndActiveContractsService';

export default class AcceptedAndActiveContractsController {
    public async index(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const indexAcceptedAndActiveContracts = container.resolve(
            IndexAcceptedAndActiveContractsService,
        );

        const contracts = await indexAcceptedAndActiveContracts.execute();

        return response.json(contracts);
    }
}
