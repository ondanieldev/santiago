import AppError from '@shared/errors/AppError';
import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import FakeDebitsRepository from '@modules/debits/repositories/fakes/FakeDebitsRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AprooveContractService from './AprooveContractService';

let fakeContractsRepository: FakeContractsRepository;
let fakeDebitsRepository: FakeDebitsRepository;
let fakeMailProvider: FakeMailProvider;
let aprooveContract: AprooveContractService;

describe('AprooveContract', () => {
    beforeEach(() => {
        fakeContractsRepository = new FakeContractsRepository();
        fakeDebitsRepository = new FakeDebitsRepository();
        fakeMailProvider = new FakeMailProvider();

        aprooveContract = new AprooveContractService(
            fakeContractsRepository,
            fakeDebitsRepository,
            fakeMailProvider,
        );
    });

    it('should be able to aproove enrollment, generate debit and send a notify email', async () => {
        const createDebit = jest.spyOn(fakeDebitsRepository, 'create');

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'student',
        });

        const aproovedContract = await aprooveContract.execute({
            id: contract.id,
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

    it('should be able to aproove enrollment, generate debit and do not send email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'student',
        });

        await aprooveContract.execute({
            id: contract.id,
            comment: 'aprooving',
        });

        expect(sendMail).toBeCalledTimes(0);
    });

    it('should not be able to aproove a non-existing enrollment', async () => {
        await expect(
            aprooveContract.execute({
                id: 'non-existing-enrollment',
                comment: 'aprooving',
                responsible_contact: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                },
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
