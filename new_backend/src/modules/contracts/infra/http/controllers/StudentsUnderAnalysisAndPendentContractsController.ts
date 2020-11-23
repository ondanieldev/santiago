import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import IndexUnderAnalysisAndPendentContractsByStudentNameService from '../../../services/IndexUnderAnalysisAndPendentContractsByStudentNameService';

class StudentsUnderAnalysisAndPendentContractsController {
    public async index(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { student_name } = request.query;

        const { grade_id } = request.params;

        const indexUnderAnalysisAndPendentContractsByStudentName = container.resolve(
            IndexUnderAnalysisAndPendentContractsByStudentNameService,
        );

        const contracts = await indexUnderAnalysisAndPendentContractsByStudentName.execute(
            String(student_name),
            grade_id,
        );

        return response.json(contracts);
    }
}

export default StudentsUnderAnalysisAndPendentContractsController;
