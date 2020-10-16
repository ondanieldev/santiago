import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import IndexContractsMatchesStudentNameService from '../../../services/IndexContractsMatchesStudentNameService';

export default class UnderAnalysisAndPendentContractsController {
    public async index(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { student_name } = request.params;

        const indexContractsMatchesStudentName = container.resolve(
            IndexContractsMatchesStudentNameService,
        );

        const parsedStudentName = student_name.toLowerCase();

        const contracts = await indexContractsMatchesStudentName.execute(
            parsedStudentName,
        );

        return response.json(contracts);
    }
}
