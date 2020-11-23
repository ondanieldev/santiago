import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import IndexActiveContractsByStudentNameService from '../../../services/IndexActiveContractsByStudentNameService';

class StudentsActiveContractsController {
    public async index(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { student_name } = request.query;

        const { grade_id } = request.params;

        const indexActiveContractsByStudentName = container.resolve(
            IndexActiveContractsByStudentNameService,
        );

        const contracts = await indexActiveContractsByStudentName.execute(
            String(student_name),
            grade_id,
        );

        return response.json(contracts);
    }
}

export default StudentsActiveContractsController;
