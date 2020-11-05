import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import IndexActiveContractsByGradeIdService from '../../../services/IndexActiveContractsByGradeIdService';

class GradesActiveContractsController {
    public async index(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { grade_id } = request.params;

        const indexActiveContractsByGradeId = container.resolve(
            IndexActiveContractsByGradeIdService,
        );

        const contracts = await indexActiveContractsByGradeId.execute(grade_id);

        return response.json(contracts);
    }
}

export default GradesActiveContractsController;
