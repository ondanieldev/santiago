import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import IndexUnderAnalysisAndPendentContractsService from '../../../services/IndexUnderAnalysisAndPendentContractsService';

export default class UnderAnalysisAndPendentContractsController {
    public async index(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const indexUnderAnalysisAndPendentContracts = container.resolve(
            IndexUnderAnalysisAndPendentContractsService,
        );

        const contracts = await indexUnderAnalysisAndPendentContracts.execute();

        return response.json(contracts);
    }
}
