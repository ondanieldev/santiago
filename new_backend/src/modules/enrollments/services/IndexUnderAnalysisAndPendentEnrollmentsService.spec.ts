import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import IndexUnderAnalysisAndPendentEnrollmentsService from './IndexUnderAnalysisAndPendentEnrollmentsService';

let fakeContractsRepository: FakeContractsRepository;
let indexUnderAnalysisAndPendentEnrollments: IndexUnderAnalysisAndPendentEnrollmentsService;

describe('IndexUnderAnalysisAndPendentEnrollments', () => {
    beforeEach(() => {
        fakeContractsRepository = new FakeContractsRepository();

        indexUnderAnalysisAndPendentEnrollments = new IndexUnderAnalysisAndPendentEnrollmentsService(
            fakeContractsRepository,
        );
    });

    it('should be able to list all enrollments with underAnalysis or pendent status', async () => {
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

        const contracts = await indexUnderAnalysisAndPendentEnrollments.execute();

        expect(contracts[0].id).toBe(pendentContract.id);
        expect(contracts[1].id).toBe(underAnalysisContract.id);
    });

    it('should not be able to list enrollments without underAnalysis or pendent status', async () => {
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

        const contracts = await indexUnderAnalysisAndPendentEnrollments.execute();

        expect(contracts).toStrictEqual([]);
    });
});
