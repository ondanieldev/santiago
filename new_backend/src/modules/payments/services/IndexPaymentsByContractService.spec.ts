import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import FakeDebitsRepository from '@modules/debits/repositories/fakes/FakeDebitsRepository';
import FakePaymentsRepository from '@modules/payments/repositories/fakes/FakePaymentsRepository';
import IndexPaymentsByContractService from './IndexPaymentsByContractService';

let fakePaymentsRepository: FakePaymentsRepository;
let fakeContractsRepository: FakeContractsRepository;
let fakeDebitsRepository: FakeDebitsRepository;
let indexPaymentsByContract: IndexPaymentsByContractService;

describe('IndexPaymentsByContract', () => {
    beforeEach(() => {
        fakePaymentsRepository = new FakePaymentsRepository();
        fakeContractsRepository = new FakeContractsRepository();
        fakeDebitsRepository = new FakeDebitsRepository();

        indexPaymentsByContract = new IndexPaymentsByContractService(
            fakePaymentsRepository,
        );
    });

    it('should be able to index all contracts payments', async () => {
        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'student',
            status: 'active',
        });

        const debit = await fakeDebitsRepository.create({
            contract_id: contract.id,
            description: 'new installment',
            payment_limit_date: new Date(),
            value: 100,
            type: 'installment',
        });

        const payment = await fakePaymentsRepository.create({
            amount: 100,
            debit_id: debit.id,
            method: 'cash',
            user_id: 'user',
            receipt: 'recibo',
        });

        Object.assign(payment, debit);

        await fakePaymentsRepository.save(payment);

        const payments = await indexPaymentsByContract.execute(contract.id);

        expect(payments[0].id).toBe(payment.id);
    });
});
