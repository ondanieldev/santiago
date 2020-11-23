"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _FakeStudentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeStudentsRepository"));

var _UpdateStudentPhotosService = _interopRequireDefault(require("./UpdateStudentPhotosService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeStudentsRepository;
let fakeStorageProvider;
let updateStudentPhotos;
describe('UpdateStudentPhotos', () => {
  beforeEach(() => {
    fakeStudentsRepository = new _FakeStudentsRepository.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    updateStudentPhotos = new _UpdateStudentPhotosService.default(fakeStudentsRepository, fakeStorageProvider);
  });
  it('should be able to update students photos by passing him/her id', async () => {
    const student = await fakeStudentsRepository.create({
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
    const updatedStudent = await updateStudentPhotos.execute({
      id: student.id,
      birth_certificate_photo: 'birth-certificate.png',
      health_plan_photo: 'health-plan.png',
      monthly_declaration_photo: 'monthly-declaration.png',
      school_records_photo: 'school-records.png',
      transfer_declaration_photo: 'transfer-declaration.png',
      vaccine_card_photo: 'vaccine-card.png'
    });
    expect(updatedStudent.birth_certificate_photo).toBe('birth-certificate.png');
    expect(updatedStudent.health_plan_photo).toBe('health-plan.png');
    expect(updatedStudent.monthly_declaration_photo).toBe('monthly-declaration.png');
    expect(updatedStudent.school_records_photo).toBe('school-records.png');
    expect(updatedStudent.transfer_declaration_photo).toBe('transfer-declaration.png');
    expect(updatedStudent.vaccine_card_photo).toBe('vaccine-card.png');
  });
  it('should be able to update students photos when any photo had been passed', async () => {
    const student = await fakeStudentsRepository.create({
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
    const updatedStudent = await updateStudentPhotos.execute({
      id: student.id
    });
    expect(updatedStudent.birth_certificate_photo).toBeUndefined();
    expect(updatedStudent.health_plan_photo).toBeUndefined();
    expect(updatedStudent.monthly_declaration_photo).toBeUndefined();
    expect(updatedStudent.school_records_photo).toBeUndefined();
    expect(updatedStudent.transfer_declaration_photo).toBeUndefined();
    expect(updatedStudent.vaccine_card_photo).toBeUndefined();
  });
  it('should be able to update student photos and delete the previous ones', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const student = await fakeStudentsRepository.create({
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
    await updateStudentPhotos.execute({
      id: student.id,
      birth_certificate_photo: 'birth-certificate.png',
      health_plan_photo: 'health-plan.png',
      monthly_declaration_photo: 'monthly-declaration.png',
      school_records_photo: 'school-records.png',
      transfer_declaration_photo: 'transfer-declaration.png',
      vaccine_card_photo: 'vaccine-card.png'
    });
    await updateStudentPhotos.execute({
      id: student.id,
      birth_certificate_photo: 'new-birth-certificate.png',
      health_plan_photo: 'new-health-plan.png',
      monthly_declaration_photo: 'new-monthly-declaration.png',
      school_records_photo: 'new-school-records.png',
      transfer_declaration_photo: 'new-transfer-declaration.png',
      vaccine_card_photo: 'new-vaccine-card.png'
    });
    expect(deleteFile).toBeCalledWith('birth-certificate.png');
    expect(deleteFile).toBeCalledWith('health-plan.png');
    expect(deleteFile).toBeCalledWith('monthly-declaration.png');
    expect(deleteFile).toBeCalledWith('school-records.png');
    expect(deleteFile).toBeCalledWith('transfer-declaration.png');
    expect(deleteFile).toBeCalledWith('vaccine-card.png');
  });
  it('should not be able to student photos of a non-existing student', async () => {
    await expect(updateStudentPhotos.execute({
      id: 'non-existing-student',
      birth_certificate_photo: 'birth-certificate.png',
      health_plan_photo: 'health-plan.png',
      monthly_declaration_photo: 'monthly-declaration.png',
      school_records_photo: 'school-records.png',
      transfer_declaration_photo: 'transfer-declaration.png',
      vaccine_card_photo: 'vaccine-card.png'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});