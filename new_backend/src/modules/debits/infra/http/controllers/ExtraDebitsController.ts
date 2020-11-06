import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateExtraDebitService from '../../../services/CreateExtraDebitService';
import DeleteExtraDebitService from '../../../services/DeleteExtraDebitService';
import UpdateExtraDebitService from '../../../services/UpdateExtraDebitService';

class ExtraDebitsController {
    public async create(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const {
            contract_id,
            description,
            payment_limit_date,
            value,
            discount,
            apply_interest_rules,
        } = request.body;

        const parsedDate = parseISO(payment_limit_date);

        const createExtraDebit = container.resolve(CreateExtraDebitService);

        const debit = await createExtraDebit.execute({
            contract_id,
            description,
            payment_limit_date: parsedDate,
            value,
            discount,
            apply_interest_rules,
        });

        return response.json(debit);
    }

    public async delete(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { debit_id } = request.params;

        const deleteExtraDebit = container.resolve(DeleteExtraDebitService);

        await deleteExtraDebit.execute(debit_id);

        return response.status(204).json();
    }

    public async update(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { debit_id } = request.params;

        const {
            description,
            payment_limit_date,
            value,
            discount,
            apply_interest_rules,
        } = request.body;

        const parsedDate = parseISO(payment_limit_date);

        const updateExtraDebit = container.resolve(UpdateExtraDebitService);

        const debit = await updateExtraDebit.execute({
            id: debit_id,
            description,
            payment_limit_date: parsedDate,
            value,
            discount,
            apply_interest_rules,
        });

        return response.json(debit);
    }
}

export default ExtraDebitsController;
