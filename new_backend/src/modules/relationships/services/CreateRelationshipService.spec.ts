import AppError from '@shared/errors/AppError';
import FakePersonsRepository from '@modules/persons/repositories/fakes/FakePersonsRepository';
import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import FakeRelationshipsRepository from '../repositories/fakes/FakeRelationshipsRepository';
import CreateRelationshipService from './CreateRelationshipService';

let fakeRelationshipsRepository: FakeRelationshipsRepository;
let fakeStudentsRepository: FakeStudentsRepository;
let fakePersonsRepository: FakePersonsRepository;
let createRelationship: CreateRelationshipService;

describe('CreateContract', () => {
    beforeEach(() => {
        fakeRelationshipsRepository = new FakeRelationshipsRepository();
        fakeStudentsRepository = new FakeStudentsRepository();
        fakePersonsRepository = new FakePersonsRepository();

        createRelationship = new CreateRelationshipService(
            fakeRelationshipsRepository,
            fakeStudentsRepository,
            fakePersonsRepository,
        );
    });

    it('should be able to create a new relationship between an student and a person', async () => {
        const student = await fakeStudentsRepository.create({
            birth_city: 'City',
            birth_date: new Date(),
            birth_state: 'State',
            ease_relating: true,
            father_name: 'Father',
            gender: 'male',
            mother_name: 'Mother',
            nacionality: 'Brazil',
            name: 'Student',
            race: 'white',
            food_alergy: 'Food',
            health_plan: 'Health',
            health_problem: 'Problem',
            medication_alergy: 'Medication',
            origin_school: 'Origin',
            special_necessities: 'Special',
        });

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
            education_level: 'Education',
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

        const relationship = await createRelationship.execute({
            kinship: 'Father',
            person_id: person.id,
            student_id: student.id,
        });

        expect(relationship).toHaveProperty('id');
    });

    it('should not be able to create a new relationship with a non-existing student', async () => {
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
            education_level: 'Education',
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
            createRelationship.execute({
                student_id: 'non-existing-student',
                kinship: 'Father',
                person_id: person.id,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new relationship with a non-existing person', async () => {
        const student = await fakeStudentsRepository.create({
            birth_city: 'City',
            birth_date: new Date(),
            birth_state: 'State',
            ease_relating: true,
            father_name: 'Father',
            gender: 'male',
            mother_name: 'Mother',
            nacionality: 'Brazil',
            name: 'Student',
            race: 'white',
            food_alergy: 'Food',
            health_plan: 'Health',
            health_problem: 'Problem',
            medication_alergy: 'Medication',
            origin_school: 'Origin',
            special_necessities: 'Special',
        });

        await expect(
            createRelationship.execute({
                person_id: 'non-existing-person',
                student_id: student.id,
                kinship: 'Father',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
