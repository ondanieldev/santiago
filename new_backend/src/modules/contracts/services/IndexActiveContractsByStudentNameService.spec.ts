import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import FakeContractsRepository from '../repositories/fakes/FakeContractsRepository';
import IndexActiveContractsByStudentNameService from './IndexActiveContractsByStudentNameService';

let fakeContractsRepository: FakeContractsRepository;
let fakeStudentsRepository: FakeStudentsRepository;
let indexActiveContractsByStudentName: IndexActiveContractsByStudentNameService;

describe('IndexActiveContractsByStudentName', () => {
    beforeEach(() => {
        fakeContractsRepository = new FakeContractsRepository();
        fakeStudentsRepository = new FakeStudentsRepository();

        indexActiveContractsByStudentName = new IndexActiveContractsByStudentNameService(
            fakeContractsRepository,
        );
    });

    it('should be able to list all active contracts by student name', async () => {
        const student = await fakeStudentsRepository.create({
            birth_city: 'city',
            birth_date: new Date(),
            birth_state: 'state',
            ease_relating: true,
            father_name: 'father',
            gender: 'female',
            mother_name: 'mother',
            nacionality: 'nacionality',
            name: 'student',
            race: 'black',
        });

        const activeContractThatMatches = await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: student.id,
            status: 'active',
        });

        activeContractThatMatches.student = student;

        await fakeContractsRepository.save(activeContractThatMatches);

        await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'another-student',
            status: 'active',
        });

        await fakeContractsRepository.create({
            grade_id: 'grade',
            student_id: 'student',
            status: 'accepted',
        });

        const contracts = await indexActiveContractsByStudentName.execute(
            'student',
        );

        expect(contracts).toEqual([activeContractThatMatches]);
    });
});
