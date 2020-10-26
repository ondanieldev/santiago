import AppError from '@shared/errors/AppError';
import FakePersonsRepository from '@modules/persons/repositories/fakes/FakePersonsRepository';
import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import FakeAgreementsRepository from '../repositories/fakes/FakeAgreementsRepository';
import CreateAgreementService from './CreateAgreementService';

let fakeAgreementsRepository: FakeAgreementsRepository;
let fakeContractsRepository: FakeContractsRepository;
let fakePersonsRepository: FakePersonsRepository;
let createAgreement: CreateAgreementService;

describe('CreateAgreement', () => {
    beforeEach(() => {
        fakeAgreementsRepository = new FakeAgreementsRepository();
        fakeContractsRepository = new FakeContractsRepository();
        fakePersonsRepository = new FakePersonsRepository();

        createAgreement = new CreateAgreementService(
            fakeAgreementsRepository,
            fakeContractsRepository,
            fakePersonsRepository,
        );
    });

    it('should be able to create a new agreement between a person and a contract', async () => {
        const person = await fakePersonsRepository.create({
            address_cep: 'CEP',
            address_city: 'City',
            address_neighborhood: 'Neighborhood',
            address_number: '01',
            address_street: 'Street',
            birth_date: new Date(),
            civil_state: 'Civil',
            commercial_phone: '00',
            cpf: '53318849545',
            education_level: 'elementary_completed',
            email: 'johndoe@example.com',
            income_tax: true,
            monthly_income: 100,
            nacionality: 'Nacionality',
            name: 'John Doe',
            personal_phone: '00',
            profission: 'Profission',
            residencial_phone: '00',
            rg: 'RG',
            workplace: 'Workplace',
            address_complement: 'Complement',
        });

        const contract = await fakeContractsRepository.create({
            grade_id: 'Grade Example',
            student_id: 'student',
        });

        const agreement = await createAgreement.execute({
            contract_id: contract.id,
            person_id: person.id,
            responsible_type: 'financial',
        });

        expect(agreement).toHaveProperty('id');
    });

    it('should not be able to create a new agreement with a non-existing contract', async () => {
        const person = await fakePersonsRepository.create({
            address_cep: 'CEP',
            address_city: 'City',
            address_neighborhood: 'Neighborhood',
            address_number: '01',
            address_street: 'Street',
            birth_date: new Date(),
            civil_state: 'Civil',
            commercial_phone: '00',
            cpf: '53318849545',
            education_level: 'elementary_completed',
            email: 'johndoe@example.com',
            income_tax: true,
            monthly_income: 100,
            nacionality: 'Nacionality',
            name: 'John Doe',
            personal_phone: '00',
            profission: 'Profission',
            residencial_phone: '00',
            rg: 'RG',
            workplace: 'Workplace',
            address_complement: 'Complement',
        });

        await expect(
            createAgreement.execute({
                contract_id: 'non-existing-contract',
                person_id: person.id,
                responsible_type: 'financial',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new agreement with a non-existing person', async () => {
        const contract = await fakeContractsRepository.create({
            grade_id: 'Grade Example',
            student_id: 'student',
        });

        await expect(
            createAgreement.execute({
                person_id: 'non-existing-person',
                contract_id: contract.id,
                responsible_type: 'financial',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
