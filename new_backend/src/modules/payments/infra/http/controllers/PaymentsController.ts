import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreatePaymentService from '@modules/payments/services/CreatePaymentService';

export default class PaymentsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { debit_id, method } = request.body;

        const user_id = request.user.id;

        const createPayment = container.resolve(CreatePaymentService);

        const payment = await createPayment.execute({
            debit_id,
            method,
            user_id,
        });

        return response.json(classToClass(payment));
    }
}
