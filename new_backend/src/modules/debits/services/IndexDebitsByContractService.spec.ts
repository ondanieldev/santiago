import AppError from '@shared/errors/AppError';
import FakeDebitsRepository from '@modules/debits/repositories/fakes/FakeDebitsRepository';
import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import IndexDebitsByContractService from './IndexDebitsByContractService';

let fakeDebitsRepository: FakeDebitsRepository;
let fakeContractsRepository: FakeContractsRepository;
let indexDebitsByContract: IndexDebitsByContractService;

describe('IndexContractDebits', () => {
    beforeEach(() => {
        fakeDebitsRepository = new FakeDebitsRepository();
        fakeContractsRepository = new FakeContractsRepository();

        indexDebitsByContract = new IndexDebitsByContractService(
            fakeDebitsRepository,
            fakeContractsRepository,
        );
    });

    it('should be able to list all debits related to a contract', async () => {
        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            status: 'accepted',
            student_id: 'student',
        });

        const debit = await fakeDebitsRepository.create({
            contract_id: contract.id,
            description: 'description',
            final_date: new Date(),
            initial_date: new Date(),
            value: 1000,
        });

        const debitsList = await indexDebitsByContract.execute(contract.id);

        expect(debitsList[0].id).toBe(debit.id);
    });

    it('should not be able to list debits that isnt related to a contract', async () => {
        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            status: 'accepted',
            student_id: 'student',
        });

        const anotherContract = await fakeContractsRepository.create({
            grade_id: 'grade',
            status: 'accepted',
            student_id: 'student',
        });

        await fakeDebitsRepository.create({
            contract_id: anotherContract.id,
            description: 'description',
            final_date: new Date(),
            initial_date: new Date(),
            value: 1000,
        });

        const debitsList = await indexDebitsByContract.execute(contract.id);

        expect(debitsList).toStrictEqual([]);
    });

    it('should not be able to list debits of a non-existing contract', async () => {
        await expect(
            indexDebitsByContract.execute('non-existing-contract'),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to list debits of a non-aprooved contract', async () => {
        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            status: 'underAnalysis',
            student_id: 'student',
        });

        await fakeDebitsRepository.create({
            contract_id: contract.id,
            description: 'description',
            final_date: new Date(),
            initial_date: new Date(),
            value: 1000,
        });

        await expect(
            indexDebitsByContract.execute(contract.id),
        ).rejects.toBeInstanceOf(AppError);
    });
});
