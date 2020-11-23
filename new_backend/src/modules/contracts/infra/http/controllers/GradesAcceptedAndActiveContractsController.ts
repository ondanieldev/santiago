import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import IndexAcceptedAndActiveContractsByGradeIdService from '../../../services/IndexAcceptedAndActiveContractsByGradeIdService';

class AcceptedAndActiveContractsGradeController {
    public async index(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { grade_id } = request.params;

        const indexAcceptedAndActiveContractsByGrade = container.resolve(
            IndexAcceptedAndActiveContractsByGradeIdService,
        );

        const contracts = await indexAcceptedAndActiveContractsByGrade.execute(
            grade_id,
        );

        return response.json(contracts);
    }
}

export default AcceptedAndActiveContractsGradeController;
