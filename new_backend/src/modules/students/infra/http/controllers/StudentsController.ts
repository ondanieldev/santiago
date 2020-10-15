import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateStudentService from '../../../services/CreateStudentService';
import UpdateStudentService from '../../../services/UpdateStudentService';

export default class StudentsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const {
            birth_city,
            birth_date,
            birth_state,
            ease_relating,
            father_name,
            gender,
            mother_name,
            nacionality,
            name,
            race,
            food_alergy,
            health_plan,
            health_problem,
            medication_alergy,
            origin_school,
            special_necessities,
        } = request.body;

        const createStudent = container.resolve(CreateStudentService);

        const student = await createStudent.execute({
            birth_city,
            birth_date,
            birth_state,
            ease_relating,
            father_name,
            gender,
            mother_name,
            nacionality,
            name,
            race,
            food_alergy,
            health_plan,
            health_problem,
            medication_alergy,
            origin_school,
            special_necessities,
        });

        return response.json(classToClass(student));
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { student_id } = request.params;

        const {
            birth_city,
            birth_date,
            birth_state,
            ease_relating,
            father_name,
            gender,
            mother_name,
            nacionality,
            name,
            race,
            food_alergy,
            health_plan,
            health_problem,
            medication_alergy,
            origin_school,
            special_necessities,
        } = request.body;

        const updateStudent = container.resolve(UpdateStudentService);

        const student = await updateStudent.execute({
            id: student_id,
            birth_city,
            birth_date,
            birth_state,
            ease_relating,
            father_name,
            gender,
            mother_name,
            nacionality,
            name,
            race,
            food_alergy,
            health_plan,
            health_problem,
            medication_alergy,
            origin_school,
            special_necessities,
        });

        return response.json(classToClass(student));
    }
}
