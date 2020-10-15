import AppError from '@shared/errors/AppError';
import FakePaymentsRepository from '@modules/payments/repositories/fakes/FakePaymentsRepository';
import FakeDischargesRepository from '@modules/discharges/repositories/fakes/FakeDischargesRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateDischargeService from './CreateDischargeService';

let fakePaymentsRepository: FakePaymentsRepository;
let fakeDischargesRepository: FakeDischargesRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let createDischarge: CreateDischargeService;

describe('CreateDischarge', () => {
    beforeEach(() => {
        fakePaymentsRepository = new FakePaymentsRepository();
        fakeDischargesRepository = new FakeDischargesRepository();
        fakeUsersRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();

        createDischarge = new CreateDischargeService(
            fakePaymentsRepository,
            fakeDischargesRepository,
            fakeUsersRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to discharge a payment by passing payment id', async () => {
        const user = await fakeUsersRepository.create({
            username: 'username',
            password: 'password',
            profile_id: 'profile',
        });

        const payment = await fakePaymentsRepository.create({
            amount: 100,
            debit_id: 'debit',
            method: 'cash',
            user_id: 'any-user',
        });

        await createDischarge.execute({
            payment_id: payment.id,
            user_id: user.id,
        });

        const paymentAfterDischarged = await fakePaymentsRepository.findById(
            payment.id,
        );

        expect(paymentAfterDischarged?.discharged).toBe(true);
    });

    it('should not be able to discharge a payment if the user is logged out', async () => {
        await expect(
            createDischarge.execute({
                payment_id: 'payment',
                user_id: 'user',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to discharge a payment that does not exists', async () => {
        const user = await fakeUsersRepository.create({
            username: 'username',
            password: 'password',
            profile_id: 'profile',
        });

        await expect(
            createDischarge.execute({
                payment_id: 'non-existing-payment',
                user_id: user.id,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to discharge a already discharged payment', async () => {
        const user = await fakeUsersRepository.create({
            username: 'username',
            password: 'password',
            profile_id: 'profile',
        });

        const payment = await fakePaymentsRepository.create({
            amount: 100,
            debit_id: 'debit',
            method: 'cash',
            user_id: 'any-user',
        });

        await createDischarge.execute({
            payment_id: payment.id,
            user_id: user.id,
        });

        await expect(
            createDischarge.execute({
                payment_id: payment.id,
                user_id: user.id,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
