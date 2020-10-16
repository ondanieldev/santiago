import AppError from '@shared/errors/AppError';
import FakeDebitsRepository from '@modules/debits/repositories/fakes/FakeDebitsRepository';
import FakePaymentsRepository from '@modules/payments/repositories/fakes/FakePaymentsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeReceiptProvider from '@shared/container/providers/ReceiptProvider/fakes/FakeReceiptProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreatePaymentService from './CreatePaymentService';

let createPayment: CreatePaymentService;
let fakeDebitsRepository: FakeDebitsRepository;
let fakePaymentsRepository: FakePaymentsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeReceiptProvider: FakeReceiptProvider;
let fakeCacheProvider: FakeCacheProvider;

describe('PayDebit', () => {
    beforeEach(() => {
        fakeDebitsRepository = new FakeDebitsRepository();
        fakePaymentsRepository = new FakePaymentsRepository();
        fakeUsersRepository = new FakeUsersRepository();
        fakeReceiptProvider = new FakeReceiptProvider();
        fakeCacheProvider = new FakeCacheProvider();

        createPayment = new CreatePaymentService(
            fakeDebitsRepository,
            fakePaymentsRepository,
            fakeUsersRepository,
            fakeReceiptProvider,
            fakeCacheProvider,
        );
    });

    it('should be able to pay a debit by changing its paid status, creating a new payment and generating receipt', async () => {
        const generateReceipt = jest.spyOn(fakeReceiptProvider, 'generate');

        const debit = await fakeDebitsRepository.create({
            contract_id: 'contract',
            description: 'description',
            final_date: new Date(),
            initial_date: new Date(),
            value: 100,
        });

        const user = await fakeUsersRepository.create({
            username: 'username',
            password: 'password',
            profile_id: 'profile',
        });

        await createPayment.execute({
            user_id: user.id,
            debit_id: debit.id,
            method: 'cash',
        });

        const debitAfterPaid = await fakeDebitsRepository.findById(debit.id);

        expect(debitAfterPaid?.paid).toBe(true);
        expect(generateReceipt).toBeCalled();
    });

    it('should not be able to pay a debit if the user is logged out', async () => {
        await expect(
            createPayment.execute({
                debit_id: 'debit',
                method: 'cash',
                user_id: 'non-logged-user',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to pay a debit if the debit does not exists', async () => {
        const user = await fakeUsersRepository.create({
            username: 'username',
            password: 'password',
            profile_id: 'profile',
        });

        await expect(
            createPayment.execute({
                user_id: user.id,
                debit_id: 'non-existing-debit',
                method: 'cash',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to pay a debit that is already paid', async () => {
        const user = await fakeUsersRepository.create({
            username: 'username',
            password: 'password',
            profile_id: 'profile',
        });

        const debit = await fakeDebitsRepository.create({
            contract_id: 'contract',
            description: 'description',
            final_date: new Date(),
            initial_date: new Date(),
            value: 100,
        });

        await createPayment.execute({
            user_id: user.id,
            debit_id: debit.id,
            method: 'cash',
        });

        await expect(
            createPayment.execute({
                user_id: user.id,
                debit_id: debit.id,
                method: 'cash',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to pay an enrollment typed debit', async () => {
        const user = await fakeUsersRepository.create({
            username: 'username',
            password: 'password',
            profile_id: 'profile',
        });

        const debit = await fakeDebitsRepository.create({
            contract_id: 'contract',
            description: 'description',
            final_date: new Date(),
            initial_date: new Date(),
            value: 100,
            type: 'enrollment',
        });

        await expect(
            createPayment.execute({
                user_id: user.id,
                debit_id: debit.id,
                method: 'cash',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
