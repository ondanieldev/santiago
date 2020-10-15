import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import IndexUnderAnalysisAndPendentContractsService from './IndexUnderAnalysisAndPendentContractsService';

let fakeContractsRepository: FakeContractsRepository;
let fakeCacheProvider: FakeCacheProvider;
let indexUnderAnalysisAndPendentContracts: IndexUnderAnalysisAndPendentContractsService;

describe('IndexUnderAnalysisAndPendentContracts', () => {
    beforeEach(() => {
        fakeContractsRepository = new FakeContractsRepository();
        fakeCacheProvider = new FakeCacheProvider();

        indexUnderAnalysisAndPendentContracts = new IndexUnderAnalysisAndPendentContractsService(
            fakeContractsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list all contracts with underAnalysis or pendent status', async () => {
        const pendentContract = await fakeContractsRepository.create({
            grade_id: '1',
            status: 'pendent',
            student_id: 'student1',
        });

        const underAnalysisContract = await fakeContractsRepository.create({
            grade_id: 'grade2',
            status: 'underAnalysis',
            student_id: 'student2',
        });

        const contracts = await indexUnderAnalysisAndPendentContracts.execute();

        expect(contracts[0].id).toBe(pendentContract.id);
        expect(contracts[1].id).toBe(underAnalysisContract.id);
    });

    it('should be able to list all cached contracts with underAnalysis or pendent status', async () => {
        const registerCache = jest.spyOn(fakeCacheProvider, 'register');

        await fakeContractsRepository.create({
            grade_id: '1',
            status: 'pendent',
            student_id: 'student1',
        });

        await fakeContractsRepository.create({
            grade_id: 'grade2',
            status: 'underAnalysis',
            student_id: 'student2',
        });

        await indexUnderAnalysisAndPendentContracts.execute();

        await indexUnderAnalysisAndPendentContracts.execute();

        expect(registerCache).toBeCalledTimes(1);
    });

    it('should not be able to list contracts without underAnalysis or pendent status', async () => {
        await fakeContractsRepository.create({
            grade_id: 'grade1',
            status: 'accepted',
            student_id: 'student1',
        });

        await fakeContractsRepository.create({
            grade_id: 'grade2',
            status: 'active',
            student_id: 'student2',
        });

        const contracts = await indexUnderAnalysisAndPendentContracts.execute();

        expect(contracts).toStrictEqual([]);
    });
});
