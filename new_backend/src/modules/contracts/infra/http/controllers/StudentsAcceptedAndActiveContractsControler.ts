import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import IndexAcceptedAndActiveContractsByStudentNameService from '../../../services/IndexAcceptedAndActiveContractsByStudentNameService';

class StudentsAcceptedAndActiveContractsController {
    public async index(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { student_name } = request.query;

        const { grade_id } = request.params;

        const indexAcceptedAndActiveContractsByStudentName = container.resolve(
            IndexAcceptedAndActiveContractsByStudentNameService,
        );

        const contracts = await indexAcceptedAndActiveContractsByStudentName.execute(
            String(student_name),
            grade_id,
        );

        return response.json(contracts);
    }
}

export default StudentsAcceptedAndActiveContractsController;
