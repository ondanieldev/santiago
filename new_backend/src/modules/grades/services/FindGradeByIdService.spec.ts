import AppError from '@shared/errors/AppError';
import FakeGradesRepository from '@modules/grades/repositories/fakes/FakeGradesRepository';
import FindGradeByIdService from './FindGradeByIdService';

let fakeGradesRepository: FakeGradesRepository;
let findGradeById: FindGradeByIdService;

describe('FindGradeById', () => {
    beforeEach(() => {
        fakeGradesRepository = new FakeGradesRepository();

        findGradeById = new FindGradeByIdService(fakeGradesRepository);
    });

    it('should be able to get all grade data by passing id', async () => {
        const grade = await fakeGradesRepository.create({
            name: 'Grade Example',
            value: 100,
            year: '2020',
        });

        const findGrade = await findGradeById.execute(grade.id);

        expect(findGrade?.name).toBe('Grade Example');
    });

    it('should not be able to get all data of a non-existing grade', async () => {
        await expect(
            findGradeById.execute('non-existing-grade'),
        ).rejects.toBeInstanceOf(AppError);
    });
});
