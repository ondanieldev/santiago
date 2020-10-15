import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import IndexAcceptedAndActiveContractsService from './IndexAcceptedAndActiveContractsService';

let fakeContractsRepository: FakeContractsRepository;
let fakeCacheProvider: FakeCacheProvider;
let indexAcceptedAndActiveContracts: IndexAcceptedAndActiveContractsService;

describe('IndexAcceptedAndActiveContracts', () => {
    beforeEach(() => {
        fakeContractsRepository = new FakeContractsRepository();
        fakeCacheProvider = new FakeCacheProvider();

        indexAcceptedAndActiveContracts = new IndexAcceptedAndActiveContractsService(
            fakeContractsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list all contracts with accepted or active status', async () => {
        const acceptedContract = await fakeContractsRepository.create({
            grade_id: 'grade1',
            status: 'accepted',
            student_id: 'student1',
        });

        const activeContract = await fakeContractsRepository.create({
            grade_id: 'grade2',
            status: 'active',
            student_id: 'student2',
        });

        const contracts = await indexAcceptedAndActiveContracts.execute();

        expect(contracts[0].id).toBe(acceptedContract.id);
        expect(contracts[1].id).toBe(activeContract.id);
    });

    it('should be able to list all cashed contracts with accepted or active status', async () => {
        const registerCache = jest.spyOn(fakeCacheProvider, 'register');

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

        await indexAcceptedAndActiveContracts.execute();

        await indexAcceptedAndActiveContracts.execute();

        expect(registerCache).toBeCalledTimes(1);
    });

    it('should not be able to list contracts without accepted or active status', async () => {
        await fakeContractsRepository.create({
            grade_id: 'grade1',
            status: 'underAnalysis',
            student_id: 'student1',
        });

        await fakeContractsRepository.create({
            grade_id: 'grade2',
            status: 'pendent',
            student_id: 'student2',
        });

        const contracts = await indexAcceptedAndActiveContracts.execute();

        expect(contracts).toStrictEqual([]);
    });
});
