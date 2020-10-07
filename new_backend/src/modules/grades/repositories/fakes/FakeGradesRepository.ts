import { v4 } from 'uuid';

import IGradesRepository from '@modules/grades/repositories/IGradesRepository';
import Grade from '@modules/grades/infra/typeorm/entities/Grade';
import ICreateGradeDTO from '@modules/grades/dtos/ICreateGradeDTO';

export default class GradesRepository implements IGradesRepository {
    private grades: Grade[] = [];

    public async find(): Promise<Grade[] | []> {
        return this.grades;
    }

    public async findById(id: string): Promise<Grade | undefined> {
        const grade = this.grades.find(findGrade => findGrade.id === id);

        return grade;
    }

    public async findByNameAndYear(
        name: string,
        year: string,
    ): Promise<Grade | undefined> {
        const grade = this.grades.find(
            findGrade => findGrade.name === name || findGrade.year === year,
        );

        return grade;
    }

    public async create(data: ICreateGradeDTO): Promise<Grade> {
        const grade = new Grade();

        Object.assign(grade, { id: v4() }, data);

        this.grades.push(grade);

        return grade;
    }

    public async save(data: Grade): Promise<Grade> {
        const grade = this.grades.find(findGrade => findGrade.id === data.id);

        Object.assign(grade, data);

        return data;
    }
}
