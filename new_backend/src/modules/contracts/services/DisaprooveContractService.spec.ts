import AppError from '@shared/errors/AppError';
import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import DisaprooveContractService from './DisaprooveContractService';

let fakeContractsRepository: FakeContractsRepository;
let fakeMailProvider: FakeMailProvider;
let disaprooveContract: DisaprooveContractService;

describe('DisaprooveEnrollment', () => {
    beforeEach(() => {
        fakeContractsRepository = new FakeContractsRepository();
        fakeMailProvider = new FakeMailProvider();

        disaprooveContract = new DisaprooveContractService(
            fakeContractsRepository,
            fakeMailProvider,
        );
    });

    it('should be able to disaproove enrollment and send a notify email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            status: 'underAnalysis',
            student_id: 'student',
        });

        const aproovedContract = await disaprooveContract.execute({
            id: contract.id,
            comment: 'disaprooving',
            responsible_contact: {
                name: 'John Doe',
                email: 'johndoe@example.com',
            },
        });

        expect(aproovedContract.status).toBe('pendent');
        expect(sendMail).toBeCalled();
    });

    it('should be able to disaproove enrollment without sending email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            status: 'underAnalysis',
            student_id: 'student',
        });

        await disaprooveContract.execute({
            id: contract.id,
            comment: 'disaprooving',
        });

        expect(sendMail).toBeCalledTimes(0);
    });

    it('should not be able to aproove a non-existing enrollment', async () => {
        await expect(
            disaprooveContract.execute({
                id: 'non-existing-enrollment',
                comment: 'disaprooving',
                responsible_contact: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                },
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
