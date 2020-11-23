"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeGradesRepository = _interopRequireDefault(require("../repositories/fakes/FakeGradesRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _CreateGradeService = _interopRequireDefault(require("./CreateGradeService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeGradesRepository;
let fakeCacheProvider;
let createGrade;
describe('CreateGrade', () => {
  beforeEach(() => {
    fakeGradesRepository = new _FakeGradesRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createGrade = new _CreateGradeService.default(fakeGradesRepository, fakeCacheProvider);
  });
  it('should be able to create a grade by passing name, year and value', async () => {
    const grade = await createGrade.execute({
      name: 'Grade Example',
      value: 100,
      year: '2020'
    });
    expect(grade).toHaveProperty('id');
  });
  it('should not be able to create a grade with the same set of name and year of another', async () => {
    await createGrade.execute({
      name: 'Grade Example',
      value: 100,
      year: '2020'
    });
    await expect(createGrade.execute({
      name: 'Grade Example',
      value: 200,
      year: '2020'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});