import AppError from '@shared/errors/AppError';
import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import FakeDebitsRepository from '@modules/debits/repositories/fakes/FakeDebitsRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AprooveContractService from './AprooveContractService';

let fakeContractsRepository: FakeContractsRepository;
let fakeDebitsRepository: FakeDebitsRepository;
let fakeMailProvider: FakeMailProvider;
let fakeCacheProvider: FakeCacheProvider;
let aprooveContract: AprooveContractService;

describe('AprooveContract', () => {
    beforeEach(() => {
        fakeContractsRepository = new FakeContractsRepository();
        fakeDebitsRepository = new FakeDebitsRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeCacheProvider = new FakeCacheProvider();

        aprooveContract = new AprooveContractService(
            fakeContractsRepository,
            fakeDebitsRepository,
            fakeMailProvider,
            fakeCacheProvider,
        );
    });

    it('should be able to aproove contract, generate debit and send a notify email', async () => {
        const createDebit = jest.spyOn(fakeDebitsRepository, 'create');

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'student',
        });

        const aproovedContract = await aprooveContract.execute({
            contract_id: contract.id,
            comment: 'aprooving',
            responsible_contact: {
                name: 'John Doe',
                email: 'johndoe@example.com',
            },
        });

        expect(aproovedContract.status).toBe('accepted');
        expect(createDebit).toBeCalled();
        expect(sendMail).toBeCalled();
    });

    it('should be able to aproove contract, generate debit and do not send email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'student',
        });

        await aprooveContract.execute({
            contract_id: contract.id,
            comment: 'aprooving',
        });

        expect(sendMail).toBeCalledTimes(0);
    });

    it('should not be able to aproove a non-existing contract', async () => {
        await expect(
            aprooveContract.execute({
                contract_id: 'non-existing-enrollment',
                comment: 'aprooving',
                responsible_contact: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                },
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to aproove a contract already aprooved', async () => {
        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'student',
        });

        await aprooveContract.execute({
            contract_id: contract.id,
            comment: 'aprooving',
        });

        await expect(
            aprooveContract.execute({
                contract_id: contract.id,
                comment: 'trying to aproov again',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
