import AppError from '@shared/errors/AppError';
import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import UpdateContractGradeService from './UpdateContractGradeService';

let fakeContractsRepository: FakeContractsRepository;
let updateContractGrade: UpdateContractGradeService;

describe('UpdateContractGrade', () => {
    beforeEach(() => {
        fakeContractsRepository = new FakeContractsRepository();

        updateContractGrade = new UpdateContractGradeService(
            fakeContractsRepository,
        );
    });

    it('should be able to update the grade field of a contract by id', async () => {
        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            status: 'underAnalysis',
            student_id: 'student',
        });

        const updatedContract = await updateContractGrade.execute({
            id: contract.id,
            grade_id: 'new-grade',
        });

        expect(updatedContract.id).toBe(contract.id);
        expect(updatedContract.grade_id).toBe('new-grade');
    });

    it('should not be able to update the grade field of a non-existing contract', async () => {
        await expect(
            updateContractGrade.execute({
                id: 'non-existing-contract',
                grade_id: 'new-grade',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
