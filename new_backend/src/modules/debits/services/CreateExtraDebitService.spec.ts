import { addDays, subDays } from 'date-fns';

import AppError from '@shared/errors/AppError';
import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import CreateExtraDebitService from './CreateExtraDebitService';
import FakeDebitsRepository from '../repositories/fakes/FakeDebitsRepository';

let fakeDebitsRepository: FakeDebitsRepository;
let fakeContractsRepository: FakeContractsRepository;
let createExtraDebitService: CreateExtraDebitService;

describe('CreateExtraDebit', () => {
    beforeEach(() => {
        fakeDebitsRepository = new FakeDebitsRepository();
        fakeContractsRepository = new FakeContractsRepository();

        createExtraDebitService = new CreateExtraDebitService(
            fakeDebitsRepository,
            fakeContractsRepository,
        );
    });

    it('should be able to create a new type extra debit', async () => {
        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'student',
            status: 'active',
        });

        const debit = await createExtraDebitService.execute({
            contract_id: contract.id,
            description: 'Extra debit',
            payment_limit_date: addDays(new Date(), 1),
            type: 'extra',
            value: 100,
            discount: 0,
        });

        expect(debit).toHaveProperty('id');
    });

    it('should not be able to create a new type extra debit attached to a non-existing contract', async () => {
        await expect(
            createExtraDebitService.execute({
                contract_id: 'non-existing-contract',
                description: 'Extra debit',
                payment_limit_date: addDays(new Date(), 1),
                type: 'extra',
                value: 100,
                discount: 0,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new type extra debit attached to a non-active contract', async () => {
        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'student',
            status: 'accepted',
        });

        await expect(
            createExtraDebitService.execute({
                contract_id: contract.id,
                description: 'Extra debit',
                payment_limit_date: addDays(new Date(), 1),
                type: 'extra',
                value: 100,
                discount: 0,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new type extra debit with a past limit date', async () => {
        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'student',
            status: 'active',
        });

        await expect(
            createExtraDebitService.execute({
                contract_id: contract.id,
                description: 'Extra debit',
                payment_limit_date: subDays(new Date(), 1),
                type: 'extra',
                value: 100,
                discount: 0,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new type extra debit with a negative discount', async () => {
        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'student',
            status: 'active',
        });

        await expect(
            createExtraDebitService.execute({
                contract_id: contract.id,
                description: 'Extra debit',
                payment_limit_date: addDays(new Date(), 1),
                type: 'extra',
                value: 100,
                discount: -1,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new type extra debit with a negative value', async () => {
        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'student',
            status: 'active',
        });

        await expect(
            createExtraDebitService.execute({
                contract_id: contract.id,
                description: 'Extra debit',
                payment_limit_date: addDays(new Date(), 1),
                type: 'extra',
                value: -1,
                discount: 0,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
