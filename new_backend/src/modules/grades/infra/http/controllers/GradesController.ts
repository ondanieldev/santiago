import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateGradeService from '@modules/grades/services/CreateGradeService';

export default class GradesController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, year, value } = request.body;

        const createGradeService = container.resolve(CreateGradeService);

        const grade = await createGradeService.execute({
            name,
            year,
            value,
        });

        return response.json(grade);
    }
}
