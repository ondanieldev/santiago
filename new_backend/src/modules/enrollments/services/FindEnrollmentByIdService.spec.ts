import AppError from '@shared/errors/AppError';

import FakeAgreementsRepository from '@modules/agreements/repositories/fakes/FakeAgreementsRepository';
import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import FindEnrollmentByIdService from './FindEnrollmentByIdService';

let fakeAgreementsRepository: FakeAgreementsRepository;
let fakeContractsRepository: FakeContractsRepository;
let findEnrollmentById: FindEnrollmentByIdService;

describe('FindEnrollmentByIdService', () => {
    beforeEach(() => {
        fakeAgreementsRepository = new FakeAgreementsRepository();
        fakeContractsRepository = new FakeContractsRepository();

        findEnrollmentById = new FindEnrollmentByIdService(
            fakeContractsRepository,
            fakeAgreementsRepository,
        );
    });

    it('should be able to find enrollment by id', async () => {
        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            status: 'underAnalysis',
            student_id: 'student',
        });

        const findContract = await findEnrollmentById.execute(contract.id);

        expect(findContract.id).toBe(contract.id);
    });

    it('should not be able to find a non-existing enrollment', async () => {
        await fakeContractsRepository.create({
            grade_id: 'grade',
            status: 'underAnalysis',
            student_id: 'student',
        });

        expect(
            findEnrollmentById.execute('non-existing-enrollment'),
        ).rejects.toBeInstanceOf(AppError);
    });
});
