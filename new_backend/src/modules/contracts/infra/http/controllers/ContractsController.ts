import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import FindContractByIdService from '../../../services/FindContractByIdService';

export default class ContractsController {
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
