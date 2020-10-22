import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateContractService from '../../../services/CreateContractService';
import FindContractByIdService from '../../../services/FindContractByIdService';

export default class ContractsController {
    public async create(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { grade_id, student_id } = request.body;

        const createContract = container.resolve(CreateContractService);

        const contract = await createContract.execute({
            grade_id,
            student_id,
        });

        return response.json(contract);
    }

    public async show(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { contract_id } = request.params;

        const findContractById = container.resolve(FindContractByIdService);

        const contract = await findContractById.execute(contract_id);

        return response.json(classToClass(contract));
    }
}
