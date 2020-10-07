import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import IndexAcceptedAndActiveEnrollmentsService from './IndexAcceptedAndActiveEnrollmentsService';

let fakeContractsRepository: FakeContractsRepository;
let indexAcceptedAndActiveEnrollments: IndexAcceptedAndActiveEnrollmentsService;

describe('IndexAcceptedAndActiveEnrollmentsService', () => {
    beforeEach(() => {
        fakeContractsRepository = new FakeContractsRepository();

        indexAcceptedAndActiveEnrollments = new IndexAcceptedAndActiveEnrollmentsService(
            fakeContractsRepository,
        );
    });

    it('should be able to list all enrollments with accepted or active status', async () => {
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

        const contracts = await indexAcceptedAndActiveEnrollments.execute();

        expect(contracts[0].id).toBe(acceptedContract.id);
        expect(contracts[1].id).toBe(activeContract.id);
    });

    it('should not be able to list enrollments without accepted or active status', async () => {
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

        const contracts = await indexAcceptedAndActiveEnrollments.execute();

        expect(contracts).toStrictEqual([]);
    });
});
