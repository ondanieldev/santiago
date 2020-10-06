import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import FakeDebitsRepository from '@modules/debits/repositories/fakes/FakeDebitsRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AprooveEnrollmentService from './AprooveEnrollmentService';

let fakeContractsRepository: FakeContractsRepository;
let fakeDebitsRepository: FakeDebitsRepository;
let fakeMailProvider: FakeMailProvider;
let aprooveEnrollment: AprooveEnrollmentService;

describe('AprooveEnrollment', () => {
    beforeEach(() => {
        fakeContractsRepository = new FakeContractsRepository();
        fakeDebitsRepository = new FakeDebitsRepository();
        fakeMailProvider = new FakeMailProvider();

        aprooveEnrollment = new AprooveEnrollmentService(
            fakeContractsRepository,
            fakeDebitsRepository,
            fakeMailProvider,
        );
    });

    it('should be able to aproove enrollment by passing id and a optional comment', async () => {
        const createDebit = jest.spyOn(fakeDebitsRepository, 'create');

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            status: 'underAnalysis',
            student_id: 'student',
        });

        const aproovedContract = await aprooveEnrollment.execute({
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
});
