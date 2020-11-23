import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import FakeGradesRepository from '@modules/grades/repositories/fakes/FakeGradesRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import IndexUnderAnalysisAndPendentContractsByGradeIdService from './IndexUnderAnalysisAndPendentContractsByGradeIdService';

let fakeContractsRepository: FakeContractsRepository;
let fakeGradesRepository: FakeGradesRepository;
let fakeCacheProvider: FakeCacheProvider;
let indexUnderAnalysisAndPendentContractsByGrade: IndexUnderAnalysisAndPendentContractsByGradeIdService;

describe('IndexUnderAnalysisAndPendentContracts', () => {
    beforeEach(() => {
        fakeContractsRepository = new FakeContractsRepository();
        fakeGradesRepository = new FakeGradesRepository();
        fakeCacheProvider = new FakeCacheProvider();

        indexUnderAnalysisAndPendentContractsByGrade = new IndexUnderAnalysisAndPendentContractsByGradeIdService(
            fakeContractsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list all contracts with underAnalysis or pendent status', async () => {
        const grade = await fakeGradesRepository.create({
            name: 'grade',
            value: 100,
            year: '2020',
        });

        const pendentContract = await fakeContractsRepository.create({
            grade_id: grade.id,
            status: 'pendent',
            student_id: 'student1',
        });

        const underAnalysisContract = await fakeContractsRepository.create({
            grade_id: grade.id,
            status: 'underAnalysis',
            student_id: 'student2',
        });

        const contracts = await indexUnderAnalysisAndPendentContractsByGrade.execute(
            grade.id,
        );

        expect(contracts[0].id).toBe(pendentContract.id);
        expect(contracts[1].id).toBe(underAnalysisContract.id);
    });
});
