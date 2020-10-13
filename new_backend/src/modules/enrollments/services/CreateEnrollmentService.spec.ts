import AppError from '@shared/errors/AppError';

import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import FakePersonsRepository from '@modules/persons/repositories/fakes/FakePersonsRepository';
import FakeRelationshipsRepository from '@modules/relationships/repositories/fakes/FakeRelationshipsRepository';
import FakeAgreementsRepository from '@modules/agreements/repositories/fakes/FakeAgreementsRepository';
import FakeGradesRepository from '@modules/grades/repositories/fakes/FakeGradesRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import ICreateStudentDTO from '@modules/students/dtos/ICreateStudentDTO';
import ICreateContractDTO from '@modules/contracts/dtos/ICreateContractDTO';
import ICreateRelationshipDTO from '@modules/relationships/dtos/ICreateRelationshipDTO';
import ICreateAgreementDTO from '@modules/agreements/dtos/ICreateAgreementDTO';
import Grade from '@modules/grades/infra/typeorm/entities/Grade';

import { ICreateResponsibleDTO } from '../dtos/ICreateResponsibleDTO';
import CreateEnrollmentService from './CreateEnrollmentService';

let createEnrollment: CreateEnrollmentService;
let fakeStudentsRepository: FakeStudentsRepository;
let fakeContractsRepository: FakeContractsRepository;
let fakePersonsRepository: FakePersonsRepository;
let fakeRelationshipsRepository: FakeRelationshipsRepository;
let fakeAgreementsRepository: FakeAgreementsRepository;
let fakeGradesRepository: FakeGradesRepository;
let fakeMailProvider: FakeMailProvider;
let student: ICreateStudentDTO;
let financialResponsible: ICreateResponsibleDTO;
let supportiveResponsible: ICreateResponsibleDTO;
let grade: Grade;

describe('CreateEnrollment', () => {
    beforeEach(async () => {
        fakeStudentsRepository = new FakeStudentsRepository();
        fakeContractsRepository = new FakeContractsRepository();
        fakePersonsRepository = new FakePersonsRepository();
        fakeRelationshipsRepository = new FakeRelationshipsRepository();
        fakeAgreementsRepository = new FakeAgreementsRepository();
        fakeGradesRepository = new FakeGradesRepository();
        fakeMailProvider = new FakeMailProvider();

        createEnrollment = new CreateEnrollmentService(
            fakeStudentsRepository,
            fakeContractsRepository,
            fakePersonsRepository,
            fakeRelationshipsRepository,
            fakeAgreementsRepository,
            fakeGradesRepository,
            fakeMailProvider,
        );

        student = {
            birth_city: 'birth-city',
            birth_date: new Date(),
            birth_state: 'birth-state',
            ease_relating: true,
            father_name: 'father-name',
            gender: 'male',
            mother_name: 'mother-name',
            nacionality: 'nacionality',
            name: 'Jhon Doe Student',
            race: 'white',
            food_alergy: 'food-alergy',
            health_plan: 'health-plan',
            health_problem: 'health-problem',
            medication_alergy: 'medication-alergy',
            origin_school: 'origin-school',
            special_necessities: 'special-necessities',
        };

        financialResponsible = {
            address_cep: 'financial-cep',
            address_city: 'financial-city',
            address_neighborhood: 'financial--neighborhood',
            address_number: 'financial-address-number',
            address_street: 'financial-street',
            birth_date: new Date(),
            civil_state: 'financial-civil-state',
            commercial_phone: 'financial-commercial-phone',
            cpf: '12298797650',
            education_level: 'financial-education-level',
            email: 'financial-email',
            income_tax: true,
            monthly_income: 1000,
            nacionality: 'financial-nacionality',
            name: 'financial-name',
            personal_phone: 'financial-personal-phone',
            profission: 'financial-profission',
            residencial_phone: 'financial-residencial-phone',
            rg: 'financial-rg',
            workplace: 'financial-workplace',
            address_complement: 'financial-address-complement',
            kinship: 'financial-kinship',
        };

        supportiveResponsible = {
            address_cep: 'supportive-cep',
            address_city: 'supportive-city',
            address_neighborhood: 'supportive--neighborhood',
            address_number: 'supportive-address-number',
            address_street: 'supportive-street',
            birth_date: new Date(),
            civil_state: 'supportive-civil-state',
            commercial_phone: 'supportive-commercial-phone',
            cpf: '28878349917',
            education_level: 'supportive-education-level',
            email: 'supportive-email',
            income_tax: true,
            monthly_income: 1000,
            nacionality: 'supportive-nacionality',
            name: 'supportive-name',
            personal_phone: 'supportive-personal-phone',
            profission: 'supportive-profission',
            residencial_phone: 'supportive-residencial-phone',
            rg: 'supportive-rg',
            workplace: 'supportive-workplace',
            address_complement: 'supportive-address-complement',
            kinship: 'supportive-kinship',
        };

        grade = await fakeGradesRepository.create({
            name: 'Grade Example',
            value: 100,
            year: '2020',
        });
    });

    it('should be able to create a new enrollment from responsibles, user and grade data and send an e-mail notifying', async () => {
        const createStudent = jest.spyOn(fakeStudentsRepository, 'create');
        const createContract = jest.spyOn(fakeContractsRepository, 'create');
        const createResponsible = jest.spyOn(fakePersonsRepository, 'create');
        const createRelationship = jest.spyOn(
            fakeRelationshipsRepository,
            'create',
        );
        const createAgreement = jest.spyOn(fakeAgreementsRepository, 'create');
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        const {
            student_id,
            contract_id,
            responsibles_ids,
        } = await createEnrollment.execute({
            student,
            grade_id: grade.id,
            financial_responsible: financialResponsible,
            supportive_responsible: supportiveResponsible,
        });

        const contract = {
            grade_id: grade.id,
            student_id,
            status: 'underAnalysis',
        } as ICreateContractDTO;

        const financialRelationship = {
            kinship: 'financial-kinship',
            person_id: responsibles_ids[0],
            student_id,
        } as ICreateRelationshipDTO;

        const supportiveRelationship = {
            kinship: 'supportive-kinship',
            person_id: responsibles_ids[1],
            student_id,
        } as ICreateRelationshipDTO;

        const financialAgreement = {
            contract_id,
            person_id: responsibles_ids[0],
            responsible_type: 'financial',
        } as ICreateAgreementDTO;

        const supportiveAgreement = {
            contract_id,
            person_id: responsibles_ids[1],
            responsible_type: 'supportive',
        } as ICreateAgreementDTO;

        expect(createStudent).toHaveBeenCalledWith(student);
        expect(createContract).toHaveBeenCalledWith(contract);
        expect(createResponsible).toHaveBeenCalledWith(financialResponsible);
        expect(createResponsible).toHaveBeenCalledWith(supportiveResponsible);
        expect(createRelationship).toHaveBeenCalledWith(financialRelationship);
        expect(createRelationship).toHaveBeenCalledWith(supportiveRelationship);
        expect(createAgreement).toHaveBeenCalledWith(financialAgreement);
        expect(createAgreement).toHaveBeenCalledWith(supportiveAgreement);
        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to create a new enrollment with responsibles that have the same email', async () => {
        financialResponsible.email = 'johndoe@example.com';

        supportiveResponsible.email = 'johndoe@example.com';

        await expect(
            createEnrollment.execute({
                student,
                grade_id: grade.id,
                financial_responsible: financialResponsible,
                supportive_responsible: supportiveResponsible,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new enrollment with responsibles that have the same CPF', async () => {
        financialResponsible.cpf = '12298797650';

        supportiveResponsible.cpf = '12298797650';

        await expect(
            createEnrollment.execute({
                student,
                grade_id: grade.id,
                financial_responsible: financialResponsible,
                supportive_responsible: supportiveResponsible,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new enrollment with responsibles that have the same RG', async () => {
        financialResponsible.rg = 'MG18603483';

        supportiveResponsible.rg = 'MG18603483';

        await expect(
            createEnrollment.execute({
                student,
                grade_id: grade.id,
                financial_responsible: financialResponsible,
                supportive_responsible: supportiveResponsible,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new enrollment with responsible that does not have a valid CPF', async () => {
        financialResponsible.cpf = '12345678911';

        await expect(
            createEnrollment.execute({
                student,
                grade_id: grade.id,
                financial_responsible: financialResponsible,
                supportive_responsible: supportiveResponsible,
            }),
        ).rejects.toBeInstanceOf(AppError);

        financialResponsible.cpf = 'string-cpf';

        await expect(
            createEnrollment.execute({
                student,
                grade_id: grade.id,
                financial_responsible: financialResponsible,
                supportive_responsible: supportiveResponsible,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new enrollment with responsible that uses the same credentials of another', async () => {
        await createEnrollment.execute({
            student,
            grade_id: grade.id,
            financial_responsible: financialResponsible,
            supportive_responsible: supportiveResponsible,
        });

        await expect(
            createEnrollment.execute({
                student,
                grade_id: grade.id,
                financial_responsible: financialResponsible,
                supportive_responsible: supportiveResponsible,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new enrollment with a non-existing grade', async () => {
        await expect(
            createEnrollment.execute({
                student,
                grade_id: 'non-existing-grade',
                financial_responsible: financialResponsible,
                supportive_responsible: supportiveResponsible,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
