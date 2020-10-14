import AppError from '@shared/errors/AppError';
import FakeGradesRepository from '@modules/grades/repositories/fakes/FakeGradesRepository';
import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import FakeContractsRepository from '../repositories/fakes/FakeContractsRepository';
import CreateContractService from './CreateContractService';

let fakeStudentsRepository: FakeStudentsRepository;
let fakeGradesRepository: FakeGradesRepository;
let fakeContractsRepository: FakeContractsRepository;
let createContract: CreateContractService;

describe('CreateContract', () => {
    beforeEach(() => {
        fakeContractsRepository = new FakeContractsRepository();
        fakeStudentsRepository = new FakeStudentsRepository();
        fakeGradesRepository = new FakeGradesRepository();

        createContract = new CreateContractService(
            fakeContractsRepository,
            fakeStudentsRepository,
            fakeGradesRepository,
        );
    });

    it('should be able to create a new contract', async () => {
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

        const grade = await fakeGradesRepository.create({
            name: 'Grade Example',
            value: 100,
            year: '2020',
        });

        const contract = await createContract.execute({
            grade_id: grade.id,
            student_id: student.id,
        });

        expect(contract).toHaveProperty('id');
    });

    it('should not be able to create a new contract with a non-existing student', async () => {
        const grade = await fakeGradesRepository.create({
            name: 'Grade Example',
            value: 100,
            year: '2020',
        });

        await expect(
            createContract.execute({
                student_id: 'non-existing-student',
                grade_id: grade.id,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new contract with a non-existing grade', async () => {
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
            createContract.execute({
                grade_id: 'non-existing-grade',
                student_id: student.id,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
