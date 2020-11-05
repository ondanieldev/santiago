import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import IndexActiveContractsByStudentNameService from '../../../services/IndexActiveContractsByStudentNameService';

class StudentsActiveContractsController {
    public async index(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { student_name } = request.params;

        const indexActiveContractsByStudentName = container.resolve(
            IndexActiveContractsByStudentNameService,
        );

        const contracts = await indexActiveContractsByStudentName.execute(
            student_name,
        );

        return response.json(contracts);
    }
}

export default StudentsActiveContractsController;
