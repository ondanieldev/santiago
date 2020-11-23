"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeGradesRepository = _interopRequireDefault(require("../repositories/fakes/FakeGradesRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _UpdateGradeService = _interopRequireDefault(require("./UpdateGradeService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeGradesRepository;
let fakeCacheProvider;
let updateGrade;
describe('UpdateGrade', () => {
  beforeEach(() => {
    fakeGradesRepository = new _FakeGradesRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    updateGrade = new _UpdateGradeService.default(fakeGradesRepository, fakeCacheProvider);
  });
  it('should be able to update all grade data by passing id', async () => {
    const grade = await fakeGradesRepository.create({
      name: 'Grade Example',
      value: 100,
      year: '2020'
    });
    const updatedGrade = await updateGrade.execute({
      id: grade.id,
      name: 'New Grade Name',
      value: 200,
      year: '2021'
    });
    expect(updatedGrade.id).toBe(grade.id);
    expect(updatedGrade.name).toBe('New Grade Name');
  });
  it('should not be able to update a grade that does not exists', async () => {
    await expect(updateGrade.execute({
      id: 'non-existing-grade',
      name: 'Grade Example',
      value: 100,
      year: '2020'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update a grade with the same set of name and year from another', async () => {
    await fakeGradesRepository.create({
      name: 'Grade Example',
      value: 100,
      year: '2020'
    });
    const anotherGrade = await fakeGradesRepository.create({
      name: 'Another Grade Example',
      value: 200,
      year: '2020'
    });
    await expect(updateGrade.execute({
      id: anotherGrade.id,
      name: 'Grade Example',
      value: 100,
      year: '2020'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});