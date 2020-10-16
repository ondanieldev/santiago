import FakeContractsRepository from '@modules/contracts/repositories/fakes/FakeContractsRepository';
import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import IndexContractsMatchesStudentNameService from './IndexContractsMatchesStudentNameService';

let fakeContractsRepository: FakeContractsRepository;
let fakeStudentsRepository: FakeStudentsRepository;
let indexContractsMatchesStudentName: IndexContractsMatchesStudentNameService;

describe('IndexAcceptedAndActiveContracts', () => {
    beforeEach(() => {
        fakeContractsRepository = new FakeContractsRepository();
        fakeStudentsRepository = new FakeStudentsRepository();

        indexContractsMatchesStudentName = new IndexContractsMatchesStudentNameService(
            fakeContractsRepository,
        );
    });

    it('should be able to list all contracts with accepted or active status that matches with gave student name', async () => {
        const contract = await fakeContractsRepository.create({
            grade_id: 'grade1',
            status: 'accepted',
            student_id: 'student1',
        });

        await fakeContractsRepository.create({
            grade_id: 'grade1',
            status: 'accepted',
            student_id: 'student1',
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

        contract.student = student;

        await fakeContractsRepository.save(contract);

        const contracts = await indexContractsMatchesStudentName.execute(
            'John Doe',
        );

        expect(contracts[0]).toBe(contract);
        expect(contracts[1]).toBeUndefined();
    });
});
