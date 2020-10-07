import AppError from '@shared/errors/AppError';
import FakeGradesRepository from '@modules/grades/repositories/fakes/FakeGradesRepository';
import CreateGradeService from './CreateGradeService';

let fakeGradesRepository: FakeGradesRepository;
let createGrade: CreateGradeService;

describe('CreateGrade', () => {
    beforeEach(() => {
        fakeGradesRepository = new FakeGradesRepository();

        createGrade = new CreateGradeService(fakeGradesRepository);
    });

    it('should be able to create a grade by passing name, year and value', async () => {
        const grade = await createGrade.execute({
            name: 'Grade Example',
            value: 100,
            year: '2020',
        });

        expect(grade).toHaveProperty('id');
    });

    it('should not be able to create a grade with the same set of name and year of another', async () => {
        await createGrade.execute({
            name: 'Grade Example',
            value: 100,
            year: '2020',
        });

        await expect(
            createGrade.execute({
                name: 'Grade Example',
                value: 200,
                year: '2020',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
