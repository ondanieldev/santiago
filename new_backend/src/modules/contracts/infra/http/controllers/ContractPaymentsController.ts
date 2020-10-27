import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IndexPaymentsService from '@modules/payments/services/IndexPaymentsByContractService';

export default class ContractPaymentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { contract_id } = request.params;

        const indexPayments = container.resolve(IndexPaymentsService);

        const payments = await indexPayments.execute(contract_id);

        return response.json(classToClass(payments));
    }
}
