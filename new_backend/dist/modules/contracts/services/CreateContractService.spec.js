"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeGradesRepository = _interopRequireDefault(require("../../grades/repositories/fakes/FakeGradesRepository"));

var _FakeStudentsRepository = _interopRequireDefault(require("../../students/repositories/fakes/FakeStudentsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeContractsRepository = _interopRequireDefault(require("../repositories/fakes/FakeContractsRepository"));

var _CreateContractService = _interopRequireDefault(require("./CreateContractService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeStudentsRepository;
let fakeGradesRepository;
let fakeContractsRepository;
let fakeCacheProvider;
let createContract;
describe('CreateContract', () => {
  beforeEach(() => {
    fakeContractsRepository = new _FakeContractsRepository.default();
    fakeStudentsRepository = new _FakeStudentsRepository.default();
    fakeGradesRepository = new _FakeGradesRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createContract = new _CreateContractService.default(fakeContractsRepository, fakeStudentsRepository, fakeGradesRepository, fakeCacheProvider);
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
      special_necessities: 'Special'
    });
    const grade = await fakeGradesRepository.create({
      name: 'Grade Example',
      value: 100,
      year: '2020'
    });
    const contract = await createContract.execute({
      grade_id: grade.id,
      student_id: student.id
    });
    expect(contract).toHaveProperty('id');
  });
  it('should not be able to create a new contract with a non-existing student', async () => {
    const grade = await fakeGradesRepository.create({
      name: 'Grade Example',
      value: 100,
      year: '2020'
    });
    await expect(createContract.execute({
      student_id: 'non-existing-student',
      grade_id: grade.id
    })).rejects.toBeInstanceOf(_AppError.default);
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
      special_necessities: 'Special'
    });
    await expect(createContract.execute({
      grade_id: 'non-existing-grade',
      student_id: student.id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});