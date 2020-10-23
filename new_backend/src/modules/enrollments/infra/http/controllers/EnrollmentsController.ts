import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import CreateEnrollmentService from '../../../services/CreateEnrollmentService';

export default class EnrollmentsController {
    public async create(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const {
            financial_responsible,
            grade,
            student,
            supportive_responsible,
            financial_responsible_id,
            supportive_responsible_id,
        } = request.body;

        const createEnrollment = container.resolve(CreateEnrollmentService);

        const {
            supportive_id,
            student_id,
            financial_id,
        } = await createEnrollment.execute({
            financial_responsible,
            grade,
            student,
            supportive_responsible,
            financial_responsible_id,
            supportive_responsible_id,
        });

        return response.status(200).send({
            supportive_id,
            student_id,
            financial_id,
        });
    }
}
