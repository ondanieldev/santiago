import AppError from '@shared/errors/AppError';
import FakeDebitsRepository from '@modules/debits/repositories/fakes/FakeDebitsRepository';
import FakePaymentsRepository from '@modules/payments/repositories/fakes/FakePaymentsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import FakePersonsRepository from '@modules/persons/repositories/fakes/FakePersonsRepository';
import FakeProfilesRepository from '@modules/profiles/repositories/fakes/FakeProfilesRepository';
import FakeReceiptProvider from '@shared/container/providers/ReceiptProvider/fakes/FakeReceiptProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import CreateEnrollmentPaymentService from './CreateEnrollmentPaymentService';

let fakeDebitsRepository: FakeDebitsRepository;
let fakePaymentsRepository: FakePaymentsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeContractsRepository: FakeContractsRepository;
let fakeStudentsRepository: FakeStudentsRepository;
let fakePersonsRepository: FakePersonsRepository;
let fakeProfilesRepository: FakeProfilesRepository;
let fakeReceiptProvider: FakeReceiptProvider;
let fakeCacheProvider: FakeCacheProvider;
let fakeMailProvider: FakeMailProvider;
let fakeHashProvider: FakeHashProvider;
let createEnrollmentPayment: CreateEnrollmentPaymentService;

describe('PayDebit', () => {
    beforeEach(() => {
        fakeDebitsRepository = new FakeDebitsRepository();
        fakePaymentsRepository = new FakePaymentsRepository();
        fakeUsersRepository = new FakeUsersRepository();
        fakeContractsRepository = new FakeContractsRepository();
        fakeStudentsRepository = new FakeStudentsRepository();
        fakePersonsRepository = new FakePersonsRepository();
        fakeProfilesRepository = new FakeProfilesRepository();
        fakeReceiptProvider = new FakeReceiptProvider();
        fakeCacheProvider = new FakeCacheProvider();
        fakeMailProvider = new FakeMailProvider();
        fakeHashProvider = new FakeHashProvider();

        createEnrollmentPayment = new CreateEnrollmentPaymentService(
            fakeDebitsRepository,
            fakePaymentsRepository,
            fakeUsersRepository,
            fakeContractsRepository,
            fakeStudentsRepository,
            fakePersonsRepository,
            fakeProfilesRepository,
            fakeReceiptProvider,
            fakeCacheProvider,
            fakeMailProvider,
            fakeHashProvider,
        );
    });

    it('should be able to pay a enrollment debit by changing its paid status, creating a new payment, generating receipt, generating users and sending mails', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'student',
            status: 'underAnalysis',
        });

        const student = await fakeStudentsRepository.create({
            birth_city: 'city',
            birth_date: new Date(),
            birth_state: 'state',
            ease_relating: true,
            father_name: 'father',
            gender: 'male',
            mother_name: 'mother',
            nacionality: 'nacionality',
            name: 'John Doe',
            race: 'white',
        });

        const responsible = await fakePersonsRepository.create({
            address_cep: 'cep',
            address_city: 'city',
            address_neighborhood: 'neighborhood',
            address_number: '1',
            address_street: 'strret',
            birth_date: new Date(),
            civil_state: 'civil',
            commercial_phone: '123456',
            cpf: 'cpf',
            education_level: 'elementary_completed',
            email: 'johntre@gmail.com',
            income_tax: true,
            monthly_income: 1000,
            nacionality: 'nacionality',
            name: 'John Tre',
            personal_phone: '123456',
            profission: 'profisison',
            residencial_phone: '123456',
            rg: 'rg',
            workplace: 'woork',
            address_complement: 'complement',
        });

        contract.student = student;

        contract.agreements.push({
            person: responsible,
            contract,
            contract_id: contract.id,
            id: 'agreement',
            person_id: responsible.id,
            responsible_type: 'financial',
            created_at: new Date(),
        });

        await fakeContractsRepository.save(contract);

        const debit = await fakeDebitsRepository.create({
            contract_id: contract.id,
            description: 'description',
            final_date: new Date(),
            initial_date: new Date(),
            value: 100,
            type: 'enrollment',
        });

        const user = await fakeUsersRepository.create({
            username: 'paid-user',
            password: '123456',
            profile_id: 'paid-profile',
        });

        const payment = await createEnrollmentPayment.execute({
            debit_id: debit.id,
            method: 'cash',
            user_id: user.id,
        });

        const debitAfterPayment = await fakeDebitsRepository.findById(debit.id);

        const contractAfterPayment = await fakeContractsRepository.findById(
            contract.id,
        );

        const studentAfterPayment = await fakeStudentsRepository.findById(
            student.id,
        );

        const responsibleAfterPayment = await fakePersonsRepository.findById(
            responsible.id,
        );

        expect(payment).toHaveProperty('receipt');
        expect(debitAfterPayment?.paid).toBe(true);
        expect(contractAfterPayment?.status).toBe('active');
        expect(studentAfterPayment).toHaveProperty('user_id');
        expect(responsibleAfterPayment).toHaveProperty('user_id');
        expect(sendMail).toBeCalled();
    });

    it('should be able to pay a enrollment debit by changing its paid status, creating a new payment, generating receipt, generating users and sending mails with female articles', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'student',
            status: 'underAnalysis',
        });

        const student = await fakeStudentsRepository.create({
            birth_city: 'city',
            birth_date: new Date(),
            birth_state: 'state',
            ease_relating: true,
            father_name: 'father',
            gender: 'female',
            mother_name: 'mother',
            nacionality: 'nacionality',
            name: 'Jane Doe',
            race: 'white',
        });

        const responsible = await fakePersonsRepository.create({
            address_cep: 'cep',
            address_city: 'city',
            address_neighborhood: 'neighborhood',
            address_number: '1',
            address_street: 'strret',
            birth_date: new Date(),
            civil_state: 'civil',
            commercial_phone: '123456',
            cpf: 'cpf',
            education_level: 'elementary_completed',
            email: 'johntre@gmail.com',
            income_tax: true,
            monthly_income: 1000,
            nacionality: 'nacionality',
            name: 'John Tre',
            personal_phone: '123456',
            profission: 'profisison',
            residencial_phone: '123456',
            rg: 'rg',
            workplace: 'woork',
            address_complement: 'complement',
        });

        contract.student = student;

        contract.agreements.push({
            person: responsible,
            contract,
            contract_id: contract.id,
            id: 'agreement',
            person_id: responsible.id,
            responsible_type: 'financial',
            created_at: new Date(),
        });

        await fakeContractsRepository.save(contract);

        const debit = await fakeDebitsRepository.create({
            contract_id: contract.id,
            description: 'description',
            final_date: new Date(),
            initial_date: new Date(),
            value: 100,
            type: 'enrollment',
        });

        const user = await fakeUsersRepository.create({
            username: 'paid-user',
            password: '123456',
            profile_id: 'paid-profile',
        });

        const payment = await createEnrollmentPayment.execute({
            debit_id: debit.id,
            method: 'cash',
            user_id: user.id,
        });

        const debitAfterPayment = await fakeDebitsRepository.findById(debit.id);

        const contractAfterPayment = await fakeContractsRepository.findById(
            contract.id,
        );

        const studentAfterPayment = await fakeStudentsRepository.findById(
            student.id,
        );

        const responsibleAfterPayment = await fakePersonsRepository.findById(
            responsible.id,
        );

        expect(payment).toHaveProperty('receipt');
        expect(debitAfterPayment?.paid).toBe(true);
        expect(contractAfterPayment?.status).toBe('active');
        expect(studentAfterPayment).toHaveProperty('user_id');
        expect(responsibleAfterPayment).toHaveProperty('user_id');
        expect(sendMail).toBeCalled();
    });

    it('should be able to pay a enrollment debit by changing its paid status, creating a new payment, generating receipt, generating users and sending mails without generate profiles', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeProfilesRepository.create({
            name: 'Aluno',
            crud_grades_permiss: false,
            crud_profiles_permiss: false,
            crud_users_permiss: false,
            discharge_payment_permiss: false,
            new_enrollment_permiss: false,
            pay_debit_permiss: false,
            validate_enrollment_permiss: false,
        });

        await fakeProfilesRepository.create({
            name: 'Responsável',
            crud_grades_permiss: false,
            crud_profiles_permiss: false,
            crud_users_permiss: false,
            discharge_payment_permiss: false,
            new_enrollment_permiss: false,
            pay_debit_permiss: false,
            validate_enrollment_permiss: false,
        });

        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'student',
            status: 'underAnalysis',
        });

        const student = await fakeStudentsRepository.create({
            birth_city: 'city',
            birth_date: new Date(),
            birth_state: 'state',
            ease_relating: true,
            father_name: 'father',
            gender: 'male',
            mother_name: 'mother',
            nacionality: 'nacionality',
            name: 'John Doe',
            race: 'white',
        });

        const responsible = await fakePersonsRepository.create({
            address_cep: 'cep',
            address_city: 'city',
            address_neighborhood: 'neighborhood',
            address_number: '1',
            address_street: 'strret',
            birth_date: new Date(),
            civil_state: 'civil',
            commercial_phone: '123456',
            cpf: 'cpf',
            education_level: 'elementary_completed',
            email: 'johntre@gmail.com',
            income_tax: true,
            monthly_income: 1000,
            nacionality: 'nacionality',
            name: 'John Tre',
            personal_phone: '123456',
            profission: 'profisison',
            residencial_phone: '123456',
            rg: 'rg',
            workplace: 'woork',
            address_complement: 'complement',
        });

        contract.student = student;

        contract.agreements.push({
            person: responsible,
            contract,
            contract_id: contract.id,
            id: 'agreement',
            person_id: responsible.id,
            responsible_type: 'financial',
            created_at: new Date(),
        });

        await fakeContractsRepository.save(contract);

        const debit = await fakeDebitsRepository.create({
            contract_id: contract.id,
            description: 'description',
            final_date: new Date(),
            initial_date: new Date(),
            value: 100,
            type: 'enrollment',
        });

        const user = await fakeUsersRepository.create({
            username: 'paid-user',
            password: '123456',
            profile_id: 'paid-profile',
        });

        const payment = await createEnrollmentPayment.execute({
            debit_id: debit.id,
            method: 'cash',
            user_id: user.id,
        });

        const debitAfterPayment = await fakeDebitsRepository.findById(debit.id);

        const contractAfterPayment = await fakeContractsRepository.findById(
            contract.id,
        );

        const studentAfterPayment = await fakeStudentsRepository.findById(
            student.id,
        );

        const responsibleAfterPayment = await fakePersonsRepository.findById(
            responsible.id,
        );

        expect(payment).toHaveProperty('receipt');
        expect(debitAfterPayment?.paid).toBe(true);
        expect(contractAfterPayment?.status).toBe('active');
        expect(studentAfterPayment).toHaveProperty('user_id');
        expect(responsibleAfterPayment).toHaveProperty('user_id');
        expect(sendMail).toBeCalled();
    });

    it('should not be able to pay a enrollment debit if the user is logged out', async () => {
        await expect(
            createEnrollmentPayment.execute({
                user_id: 'user-logged-out',
                debit_id: 'debit',
                method: 'cash',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to pay a enrollment debit if the debit does not exists', async () => {
        const user = await fakeUsersRepository.create({
            username: 'paid-user',
            password: '123456',
            profile_id: 'paid-profile',
        });

        await expect(
            createEnrollmentPayment.execute({
                user_id: user.id,
                debit_id: 'debit',
                method: 'cash',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to pay a enrollment debit if the debit is already paid', async () => {
        const contract = await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'student',
            status: 'underAnalysis',
        });

        const student = await fakeStudentsRepository.create({
            birth_city: 'city',
            birth_date: new Date(),
            birth_state: 'state',
            ease_relating: true,
            father_name: 'father',
            gender: 'male',
            mother_name: 'mother',
            nacionality: 'nacionality',
            name: 'John Doe',
            race: 'white',
        });

        const responsible = await fakePersonsRepository.create({
            address_cep: 'cep',
            address_city: 'city',
            address_neighborhood: 'neighborhood',
            address_number: '1',
            address_street: 'strret',
            birth_date: new Date(),
            civil_state: 'civil',
            commercial_phone: '123456',
            cpf: 'cpf',
            education_level: 'elementary_completed',
            email: 'johntre@gmail.com',
            income_tax: true,
            monthly_income: 1000,
            nacionality: 'nacionality',
            name: 'John Tre',
            personal_phone: '123456',
            profission: 'profisison',
            residencial_phone: '123456',
            rg: 'rg',
            workplace: 'woork',
            address_complement: 'complement',
        });

        contract.student = student;

        contract.agreements.push({
            person: responsible,
            contract,
            contract_id: contract.id,
            id: 'agreement',
            person_id: responsible.id,
            responsible_type: 'financial',
            created_at: new Date(),
        });

        await fakeContractsRepository.save(contract);

        const debit = await fakeDebitsRepository.create({
            contract_id: contract.id,
            description: 'description',
            final_date: new Date(),
            initial_date: new Date(),
            value: 100,
            type: 'enrollment',
        });

        const user = await fakeUsersRepository.create({
            username: 'paid-user',
            password: '123456',
            profile_id: 'paid-profile',
        });

        await createEnrollmentPayment.execute({
            debit_id: debit.id,
            method: 'cash',
            user_id: user.id,
        });

        await expect(
            createEnrollmentPayment.execute({
                debit_id: debit.id,
                method: 'cash',
                user_id: user.id,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to pay a non-enrollment debit', async () => {
        const debit = await fakeDebitsRepository.create({
            contract_id: 'contract',
            description: 'description',
            final_date: new Date(),
            initial_date: new Date(),
            value: 100,
            type: 'installment',
        });

        const user = await fakeUsersRepository.create({
            username: 'paid-user',
            password: '123456',
            profile_id: 'paid-profile',
        });

        await expect(
            createEnrollmentPayment.execute({
                debit_id: debit.id,
                method: 'cash',
                user_id: user.id,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to pay a enrollment debit if the contract does not exists', async () => {
        const debit = await fakeDebitsRepository.create({
            contract_id: 'non-existing-contract',
            description: 'description',
            final_date: new Date(),
            initial_date: new Date(),
            value: 100,
            type: 'enrollment',
        });

        const user = await fakeUsersRepository.create({
            username: 'paid-user',
            password: '123456',
            profile_id: 'paid-profile',
        });

        await expect(
            createEnrollmentPayment.execute({
                debit_id: debit.id,
                method: 'cash',
                user_id: user.id,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
