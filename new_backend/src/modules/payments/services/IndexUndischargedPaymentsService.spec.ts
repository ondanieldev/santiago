import FakePaymentsRepository from '@modules/payments/repositories/fakes/FakePaymentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import IndexUndischargedPaymentsService from './IndexUndischargedPaymentsService';

let fakePaymentsRepository: FakePaymentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let indexUndischargedPayments: IndexUndischargedPaymentsService;

describe('IndexUndischargedPayments', () => {
    beforeEach(() => {
        fakePaymentsRepository = new FakePaymentsRepository();
        fakeCacheProvider = new FakeCacheProvider();

        indexUndischargedPayments = new IndexUndischargedPaymentsService(
            fakePaymentsRepository,
            fakeCacheProvider,
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

    it('should be able to index all cached undischarged payments', async () => {
        const payment = await fakePaymentsRepository.create({
            amount: 100,
            debit_id: 'debit',
            method: 'cash',
            user_id: 'user',
        });

        await indexUndischargedPayments.execute();

        const cachedPayments = await indexUndischargedPayments.execute();

        expect(cachedPayments[0].id).toBe(payment.id);
    });
});
