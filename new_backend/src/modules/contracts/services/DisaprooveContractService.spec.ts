import AppError from '@shared/errors/AppError';
import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import DisaprooveContractService from './DisaprooveContractService';

let fakeContractsRepository: FakeContractsRepository;
let fakeMailProvider: FakeMailProvider;
let fakeCacheProvider: FakeCacheProvider;
let disaprooveContract: DisaprooveContractService;

describe('DisaprooveContract', () => {
    beforeEach(() => {
        fakeContractsRepository = new FakeContractsRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeCacheProvider = new FakeCacheProvider();

        disaprooveContract = new DisaprooveContractService(
            fakeContractsRepository,
            fakeMailProvider,
            fakeCacheProvider,
        );
    });

    it('should be able to disaproove contract and send a notify email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            status: 'underAnalysis',
            student_id: 'student',
        });

        const aproovedContract = await disaprooveContract.execute({
            contract_id: contract.id,
            comment: 'disaprooving',
            responsible_contact: {
                name: 'John Doe',
                email: 'johndoe@example.com',
            },
        });

        expect(aproovedContract.status).toBe('pendent');
        expect(sendMail).toBeCalled();
    });

    it('should be able to disaproove contract without sending email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            status: 'underAnalysis',
            student_id: 'student',
        });

        await disaprooveContract.execute({
            contract_id: contract.id,
            comment: 'disaprooving',
        });

        expect(sendMail).toBeCalledTimes(0);
    });

    it('should not be able to aproove a non-existing contract', async () => {
        await expect(
            disaprooveContract.execute({
                contract_id: 'non-existing-enrollment',
                comment: 'disaprooving',
                responsible_contact: {
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                },
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to disaproove a contract already aprooved', async () => {
        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'student',
        });

        Object.assign(contract, { status: 'accepted' });

        await fakeContractsRepository.save(contract);

        await expect(
            disaprooveContract.execute({
                contract_id: contract.id,
                comment: 'trying to disaproove a contract already aprooved',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
