import AppError from '@shared/errors/AppError';
import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import FakeGradesRepository from '@modules/grades/repositories/fakes/FakeGradesRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import UpdateContractGradeService from './UpdateContractGradeService';

let fakeContractsRepository: FakeContractsRepository;
let fakeGradesRepository: FakeGradesRepository;
let fakeCacheProvider: FakeCacheProvider;
let updateContractGrade: UpdateContractGradeService;

describe('UpdateContractGrade', () => {
    beforeEach(() => {
        fakeContractsRepository = new FakeContractsRepository();
        fakeGradesRepository = new FakeGradesRepository();
        fakeCacheProvider = new FakeCacheProvider();

        updateContractGrade = new UpdateContractGradeService(
            fakeContractsRepository,
            fakeGradesRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to update the grade field of a contract by id', async () => {
        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            status: 'underAnalysis',
            student_id: 'student',
        });

        const grade = await fakeGradesRepository.create({
            name: 'new-grade',
            value: 1000,
            year: '2020',
        });

        const updatedContract = await updateContractGrade.execute({
            contract_id: contract.id,
            grade_id: grade.id,
        });

        expect(updatedContract.id).toBe(contract.id);
        expect(updatedContract.grade).toBe(grade);
    });

    it('should not be able to update the grade field of a contract with a non-existing grade', async () => {
        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            status: 'underAnalysis',
            student_id: 'student',
        });

        await expect(
            updateContractGrade.execute({
                contract_id: contract.id,
                grade_id: 'non-existing-grade',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the grade field of a non-existing contract', async () => {
        await expect(
            updateContractGrade.execute({
                contract_id: 'non-existing-contract',
                grade_id: 'new-grade',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
