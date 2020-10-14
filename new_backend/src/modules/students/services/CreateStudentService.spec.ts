import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import CreateStudentService from './CreateStudentService';

let fakeStudentsRepository: FakeStudentsRepository;
let createStudent: CreateStudentService;

describe('CreateStudent', () => {
    beforeEach(() => {
        fakeStudentsRepository = new FakeStudentsRepository();

        createStudent = new CreateStudentService(fakeStudentsRepository);
    });

    it('should be able to create a new student', async () => {
        const student = await createStudent.execute({
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

        expect(student).toHaveProperty('id');
    });
});
