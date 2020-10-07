import AppError from '@shared/errors/AppError';
import FakeGradesRepository from '@modules/grades/repositories/fakes/FakeGradesRepository';
import UpdateGradeService from './UpdateGradeService';

let fakeGradesRepository: FakeGradesRepository;
let updateGrade: UpdateGradeService;

describe('FindGradeById', () => {
    beforeEach(() => {
        fakeGradesRepository = new FakeGradesRepository();

        updateGrade = new UpdateGradeService(fakeGradesRepository);
    });

    it('should be able to update all grade data by passing id', async () => {
        const grade = await fakeGradesRepository.create({
            name: 'Grade Example',
            value: 100,
            year: '2020',
        });

        const updatedGrade = await updateGrade.execute({
            id: grade.id,
            name: 'New Grade Name',
            value: 200,
            year: '2021',
        });

        expect(updatedGrade.id).toBe(grade.id);
        expect(updatedGrade.name).toBe('New Grade Name');
    });

    it('should not be able to update a grade that does not exists', async () => {
        await expect(
            updateGrade.execute({
                id: 'non-existing-grade',
                name: 'Grade Example',
                value: 100,
                year: '2020',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update a grade with the same set of name and year from another', async () => {
        await fakeGradesRepository.create({
            name: 'Grade Example',
            value: 100,
            year: '2020',
        });

        const anotherGrade = await fakeGradesRepository.create({
            name: 'Another Grade Example',
            value: 200,
            year: '2020',
        });

        await expect(
            updateGrade.execute({
                id: anotherGrade.id,
                name: 'Grade Example',
                value: 100,
                year: '2020',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
