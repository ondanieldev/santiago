"use strict";

var _FakeStudentsRepository = _interopRequireDefault(require("../../students/repositories/fakes/FakeStudentsRepository"));

var _FakeContractsRepository = _interopRequireDefault(require("../repositories/fakes/FakeContractsRepository"));

var _IndexActiveContractsByStudentNameService = _interopRequireDefault(require("./IndexActiveContractsByStudentNameService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeContractsRepository;
let fakeStudentsRepository;
let indexActiveContractsByStudentName;
describe('IndexActiveContractsByStudentName', () => {
  beforeEach(() => {
    fakeContractsRepository = new _FakeContractsRepository.default();
    fakeStudentsRepository = new _FakeStudentsRepository.default();
    indexActiveContractsByStudentName = new _IndexActiveContractsByStudentNameService.default(fakeContractsRepository);
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
      race: 'black'
    });
    const activeContractThatMatches = await fakeContractsRepository.create({
      grade_id: 'grade',
      student_id: student.id,
      status: 'active'
    });
    activeContractThatMatches.student = student;
    await fakeContractsRepository.save(activeContractThatMatches);
    await fakeContractsRepository.create({
      grade_id: 'grade',
      student_id: 'another-student',
      status: 'active'
    });
    await fakeContractsRepository.create({
      grade_id: 'grade',
      student_id: 'student',
      status: 'accepted'
    });
    const contracts = await indexActiveContractsByStudentName.execute('student');
    expect(contracts).toEqual([activeContractThatMatches]);
  });
});