import FakeGradesRepository from '@modules/grades/repositories/fakes/FakeGradesRepository';
import IndexGradesService from './IndexGradesService';

let fakeGradesRepository: FakeGradesRepository;
let indexGrades: IndexGradesService;

describe('IndexGrades', () => {
    beforeEach(() => {
        fakeGradesRepository = new FakeGradesRepository();

        indexGrades = new IndexGradesService(fakeGradesRepository);
    });

    it('should be able to index all grades', async () => {
        const grade = await fakeGradesRepository.create({
            name: 'Grade Example',
            value: 100,
            year: '2020',
        });

        const anotherGrade = await fakeGradesRepository.create({
            name: 'Another Grade Example',
            value: 100,
            year: '2020',
        });

        const grades = await indexGrades.execute();

        expect(grades[0].id).toBe(grade.id);
        expect(grades[1].id).toBe(anotherGrade.id);
    });
});
