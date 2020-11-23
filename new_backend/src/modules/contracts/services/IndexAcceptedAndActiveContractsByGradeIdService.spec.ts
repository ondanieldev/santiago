import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import FakeGradesRepository from '@modules/grades/repositories/fakes/FakeGradesRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import IndexAcceptedAndActiveContractsByGradeIdService from './IndexAcceptedAndActiveContractsByGradeIdService';

let fakeContractsRepository: FakeContractsRepository;
let fakeGradesRepository: FakeGradesRepository;
let fakeCacheProvider: FakeCacheProvider;
let indexAcceptedAndActiveContractsByGradeId: IndexAcceptedAndActiveContractsByGradeIdService;

describe('IndexAcceptedAndActiveContracts', () => {
    beforeEach(() => {
        fakeContractsRepository = new FakeContractsRepository();
        fakeGradesRepository = new FakeGradesRepository();
        fakeCacheProvider = new FakeCacheProvider();

        indexAcceptedAndActiveContractsByGradeId = new IndexAcceptedAndActiveContractsByGradeIdService(
            fakeContractsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list all contracts with accepted or active status', async () => {
        const grade = await fakeGradesRepository.create({
            name: 'grade',
            value: 100,
            year: '2020',
        });

        const acceptedContract = await fakeContractsRepository.create({
            grade_id: grade.id,
            status: 'accepted',
            student_id: 'student1',
        });

        const activeContract = await fakeContractsRepository.create({
            grade_id: grade.id,
            status: 'active',
            student_id: 'student2',
        });

        const contracts = await indexAcceptedAndActiveContractsByGradeId.execute(
            grade.id,
        );

        expect(contracts[0].id).toBe(acceptedContract.id);
        expect(contracts[1].id).toBe(activeContract.id);
    });
});
