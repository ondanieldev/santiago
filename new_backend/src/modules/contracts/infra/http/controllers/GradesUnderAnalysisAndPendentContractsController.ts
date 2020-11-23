import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import IndexUnderAnalysisAndPendentContractsByGradeIdService from '../../../services/IndexUnderAnalysisAndPendentContractsByGradeIdService';

class UnderAnalysisAndPendentContractsGradeController {
    public async index(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { grade_id } = request.params;

        const indexUnderAnalysisAndPendentContractsByGradeId = container.resolve(
            IndexUnderAnalysisAndPendentContractsByGradeIdService,
        );

        const contracts = await indexUnderAnalysisAndPendentContractsByGradeId.execute(
            grade_id,
        );

        return response.json(contracts);
    }
}

export default UnderAnalysisAndPendentContractsGradeController;
