import AppError from '@shared/errors/AppError';

import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import FindContractByIdService from './FindContractByIdService';

let fakeContractsRepository: FakeContractsRepository;
let findContractById: FindContractByIdService;

describe('FindContractById', () => {
    beforeEach(() => {
        fakeContractsRepository = new FakeContractsRepository();

        findContractById = new FindContractByIdService(fakeContractsRepository);
    });

    it('should be able to find contract by id', async () => {
        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'student',
        });

        const findContract = await findContractById.execute(contract.id);

        expect(findContract.id).toBe(contract.id);
    });

    it('should not be able to find a non-existing contract', async () => {
        await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'student',
        });

        expect(
            findContractById.execute('non-existing-enrollment'),
        ).rejects.toBeInstanceOf(AppError);
    });
});
