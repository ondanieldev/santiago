"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeStudentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeStudentsRepository"));

var _UpdateStudentService = _interopRequireDefault(require("./UpdateStudentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeStudentsRepository;
let updateStudent;
describe('UpdateStudent', () => {
  beforeEach(() => {
    fakeStudentsRepository = new _FakeStudentsRepository.default();
    updateStudent = new _UpdateStudentService.default(fakeStudentsRepository);
  });
  it('should be able to update all data of an student', async () => {
    const createdStudent = await fakeStudentsRepository.create({
      birth_city: 'birth_city',
      birth_date: new Date(),
      birth_state: 'birth_state',
      ease_relating: true,
      father_name: 'father_name',
      gender: 'male',
      mother_name: 'mother_name',
      nacionality: 'nacionality',
      name: 'name',
      race: 'white',
      food_alergy: 'food_alergy',
      health_plan: 'health_plan',
      health_problem: 'health_problem',
      medication_alergy: 'medication_alergy',
      origin_school: 'origin_school',
      special_necessities: 'special_necessities'
    });
    const updateStudentData = {
      birth_city: 'birth_city_update',
      birth_date: new Date(),
      birth_state: 'birth_state_update',
      ease_relating: true,
      father_name: 'father_name_update',
      gender: 'male',
      mother_name: 'mother_name_update',
      nacionality: 'nacionality_update',
      name: 'name_updated',
      race: 'white',
      food_alergy: 'food_alergy_update',
      health_plan: 'health_plan_update',
      health_problem: 'health_problem_update',
      medication_alergy: 'medication_alergy_update',
      origin_school: 'origin_school_update',
      special_necessities: 'special_necessities_update'
    };
    await updateStudent.execute({
      id: createdStudent.id,
      ...updateStudentData
    });
    const student = await fakeStudentsRepository.findById(createdStudent.id);
    expect(student?.id).toBe(createdStudent.id);
    expect(student?.name).toBe('name_updated');
  });
  it('should not be able to update a non-existing student', async () => {
    const updateStudentData = {
      birth_city: 'birth_city_update',
      birth_date: new Date(),
      birth_state: 'birth_state_update',
      ease_relating: true,
      father_name: 'father_name_update',
      gender: 'male',
      mother_name: 'mother_name_update',
      nacionality: 'nacionality_update',
      name: 'name_updated',
      race: 'white',
      food_alergy: 'food_alergy_update',
      health_plan: 'health_plan_update',
      health_problem: 'health_problem_update',
      medication_alergy: 'medication_alergy_update',
      origin_school: 'origin_school_update',
      special_necessities: 'special_necessities_update'
    };
    await expect(updateStudent.execute({
      id: 'non-existing-student',
      ...updateStudentData
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});