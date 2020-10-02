import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IndexEnrollmentsService from '@modules/enrollments/services/IndexEnrollmentsService';
import FindEnrollmentByIdService from '@modules/enrollments/services/FindEnrollmentByIdService';
import CreateEnrollmentService from '@modules/enrollments/services/CreateEnrollmentService';
import AprooveOrDisaprooveEnrollmentService from '@modules/enrollments/services/AprooveOrDisaprooveEnrollmentService';

export default class EnrollmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { debitsOrValidate, limit, page } = request.query;

        let parsedDebitsOrValidate = '';
        let parsedLimit = 0;
        let parsedPage = 1;

        if (typeof debitsOrValidate === 'string') {
            parsedDebitsOrValidate = debitsOrValidate;
        }

        if (typeof limit === 'string') {
            parsedLimit = parseInt(limit, 10);
        }

        if (typeof page === 'string') {
            parsedPage = parseInt(page, 10);
        }

        const indexEnrollments = container.resolve(IndexEnrollmentsService);

        const { contracts, pagination } = await indexEnrollments.execute({
            debitsOrValidate: parsedDebitsOrValidate,
            limit: parsedLimit,
            page: parsedPage,
        });

        return response.json({ enrollments: contracts, pagination });
    }

    public async get(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const findEnrollmentById = container.resolve(FindEnrollmentByIdService);

        const enrollment = await findEnrollmentById.execute(id);

        return response.json(enrollment);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { student, responsibles, grade_id } = request.body;

        const createEnrollmentService = container.resolve(
            CreateEnrollmentService,
        );

        const {
            student_id,
            responsibles_ids,
        } = await createEnrollmentService.execute({
            student,
            responsibles,
            grade_id,
        });

        return response.json({ student_id, responsibles_ids });
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { aproove, comment } = request.body;

        const aprooveOrDisaprooveEnrollment = container.resolve(
            AprooveOrDisaprooveEnrollmentService,
        );

        await aprooveOrDisaprooveEnrollment.execute({
            id,
            aproove,
            comment,
        });

        return response.json();
    }
}
