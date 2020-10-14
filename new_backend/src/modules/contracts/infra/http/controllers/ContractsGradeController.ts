import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import UpdateContractGradeService from '../../../services/UpdateContractGradeService';

export default class ContractsGradeController {
    public async update(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { contract_id } = request.params;

        const { grade_id } = request.body;

        const updateContractGrade = container.resolve(
            UpdateContractGradeService,
        );

        const contract = await updateContractGrade.execute({
            contract_id,
            grade_id,
        });

        return response.json(contract);
    }
}
