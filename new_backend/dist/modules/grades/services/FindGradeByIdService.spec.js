"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeGradesRepository = _interopRequireDefault(require("../repositories/fakes/FakeGradesRepository"));

var _FindGradeByIdService = _interopRequireDefault(require("./FindGradeByIdService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeGradesRepository;
let findGradeById;
describe('FindGradeById', () => {
  beforeEach(() => {
    fakeGradesRepository = new _FakeGradesRepository.default();
    findGradeById = new _FindGradeByIdService.default(fakeGradesRepository);
  });
  it('should be able to get all grade data by passing id', async () => {
    const grade = await fakeGradesRepository.create({
      name: 'Grade Example',
      value: 100,
      year: '2020'
    });
    const findGrade = await findGradeById.execute(grade.id);
    expect(findGrade?.name).toBe('Grade Example');
  });
  it('should not be able to get all data of a non-existing grade', async () => {
    await expect(findGradeById.execute('non-existing-grade')).rejects.toBeInstanceOf(_AppError.default);
  });
});