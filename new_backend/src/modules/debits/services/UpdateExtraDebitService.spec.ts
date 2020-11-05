import { addDays, subDays } from 'date-fns';

import AppError from '@shared/errors/AppError';
import UpdateExtraDebitService from './UpdateExtraDebitService';
import FakeDebitsRepository from '../repositories/fakes/FakeDebitsRepository';

let fakeDebitsRepository: FakeDebitsRepository;
let updateExtraDebit: UpdateExtraDebitService;

describe('UpdateExtraDebit', () => {
    beforeEach(() => {
        fakeDebitsRepository = new FakeDebitsRepository();

        updateExtraDebit = new UpdateExtraDebitService(fakeDebitsRepository);
    });

    it('should be able to update type extra debit', async () => {
        const updateFunction = jest.spyOn(fakeDebitsRepository, 'save');

        const debit = await fakeDebitsRepository.create({
            contract_id: 'contract',
            description: 'description',
            payment_limit_date: addDays(new Date(), 1),
            value: 100,
            discount: 0,
            type: 'extra',
        });

        const updatedDebit = await updateExtraDebit.execute({
            id: debit.id,
            description: 'new-description',
            payment_limit_date: addDays(new Date(), 2),
            value: 200,
            discount: 10,
        });

        const debitAfterUpdate = await fakeDebitsRepository.findById(debit.id);

        expect(updateFunction).toHaveBeenCalledWith(debit);
        expect(debitAfterUpdate).toEqual(updatedDebit);
    });

    it('should not be able to update a type extra debit that does not exist', async () => {
        await expect(
            updateExtraDebit.execute({
                id: 'non-existing-debit',
                description: 'description',
                payment_limit_date: addDays(new Date(), 1),
                value: 100,
                discount: 0,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update a type extra debit that is already paid', async () => {
        const debit = await fakeDebitsRepository.create({
            contract_id: 'contract',
            description: 'description',
            payment_limit_date: addDays(new Date(), 1),
            value: 100,
            discount: 0,
            type: 'extra',
        });

        debit.paid = true;

        await fakeDebitsRepository.save(debit);

        await expect(
            updateExtraDebit.execute({
                id: debit.id,
                description: 'trying to update a debit that is already paid',
                payment_limit_date: addDays(new Date(), 1),
                value: 100,
                discount: 0,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update a non-type-extra debit', async () => {
        const debit = await fakeDebitsRepository.create({
            contract_id: 'contract',
            description: 'description',
            payment_limit_date: addDays(new Date(), 1),
            value: 100,
            discount: 0,
            type: 'installment',
        });

        await expect(
            updateExtraDebit.execute({
                id: debit.id,
                description: 'trying to update a debit that is not extra type',
                payment_limit_date: addDays(new Date(), 1),
                value: 100,
                discount: 0,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update a type extra debit with a past limit date', async () => {
        const debit = await fakeDebitsRepository.create({
            contract_id: 'contract',
            description: 'description',
            payment_limit_date: addDays(new Date(), 1),
            value: 100,
            discount: 0,
            type: 'extra',
        });

        await expect(
            updateExtraDebit.execute({
                id: debit.id,
                description: 'trying to update with a past date',
                payment_limit_date: subDays(new Date(), 1),
                value: 100,
                discount: 0,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update a type extra debit with a negative discount', async () => {
        const debit = await fakeDebitsRepository.create({
            contract_id: 'contract',
            description: 'description',
            payment_limit_date: addDays(new Date(), 1),
            value: 100,
            discount: 0,
            type: 'extra',
        });

        await expect(
            updateExtraDebit.execute({
                id: debit.id,
                description: 'trying to update with a negative discount',
                payment_limit_date: addDays(new Date(), 1),
                value: 100,
                discount: -10,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new type extra debit with a negative value', async () => {
        const debit = await fakeDebitsRepository.create({
            contract_id: 'contract',
            description: 'description',
            payment_limit_date: addDays(new Date(), 1),
            value: 100,
            discount: 0,
            type: 'extra',
        });

        await expect(
            updateExtraDebit.execute({
                id: debit.id,
                description: 'trying to update with a negative value',
                payment_limit_date: addDays(new Date(), 1),
                value: -100,
                discount: 0,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
