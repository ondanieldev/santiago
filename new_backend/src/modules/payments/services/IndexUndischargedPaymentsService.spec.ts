import FakePaymentsRepository from '@modules/payments/repositories/fakes/FakePaymentsRepository';
import IndexUndischargedPaymentsService from './IndexUndischargedPaymentsService';

let fakePaymentsRepository: FakePaymentsRepository;
let indexUndischargedPayments: IndexUndischargedPaymentsService;

describe('IndexUndischargedPayments', () => {
    beforeEach(() => {
        fakePaymentsRepository = new FakePaymentsRepository();

        indexUndischargedPayments = new IndexUndischargedPaymentsService(
            fakePaymentsRepository,
        );
    });

    it('should be able to index all undischarged payments', async () => {
        const payment = await fakePaymentsRepository.create({
            amount: 100,
            debit_id: 'debit',
            method: 'cash',
            user_id: 'user',
        });

        const payments = await indexUndischargedPayments.execute();

        expect(payments[0].id).toBe(payment.id);
    });
});
