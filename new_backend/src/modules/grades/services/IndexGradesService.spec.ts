import FakeGradesRepository from '@modules/grades/repositories/fakes/FakeGradesRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import IndexGradesService from './IndexGradesService';

let fakeGradesRepository: FakeGradesRepository;
let fakeCacheProvider: FakeCacheProvider;
let indexGrades: IndexGradesService;

describe('IndexGrades', () => {
    beforeEach(() => {
        fakeGradesRepository = new FakeGradesRepository();
        fakeCacheProvider = new FakeCacheProvider();

        indexGrades = new IndexGradesService(
            fakeGradesRepository,
            fakeCacheProvider,
        );
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

    it('should be able to index all cached grades', async () => {
        const registerCache = jest.spyOn(fakeCacheProvider, 'register');

        await fakeGradesRepository.create({
            name: 'Grade Example',
            value: 100,
            year: '2020',
        });

        await fakeGradesRepository.create({
            name: 'Another Grade Example',
            value: 100,
            year: '2020',
        });

        await indexGrades.execute();

        await indexGrades.execute();

        expect(registerCache).toBeCalledTimes(1);
    });
});
