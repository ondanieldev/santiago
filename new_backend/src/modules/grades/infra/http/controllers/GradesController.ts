import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IndexGradesService from '@modules/grades/services/IndexGradesService';
import FindGradeByIdService from '@modules/grades/services/FindGradeByIdService';
import CreateGradeService from '@modules/grades/services/CreateGradeService';
import UpdateGradeService from '@modules/grades/services/UpdateGradeService';

export default class GradesController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const indexGrades = container.resolve(IndexGradesService);

        const grades = await indexGrades.execute();

        return response.json(grades);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { grade_id } = request.params;

        const findGradeById = container.resolve(FindGradeByIdService);

        const grades = await findGradeById.execute(grade_id);

        return response.json(grades);
    }

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

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, year, value } = request.body;

        const { grade_id } = request.params;

        const updateGrade = container.resolve(UpdateGradeService);

        const grade = await updateGrade.execute({
            id: grade_id,
            name,
            year,
            value,
        });

        return response.json(grade);
    }
}
