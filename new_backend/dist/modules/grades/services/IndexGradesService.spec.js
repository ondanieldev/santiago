"use strict";

var _FakeGradesRepository = _interopRequireDefault(require("../repositories/fakes/FakeGradesRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _IndexGradesService = _interopRequireDefault(require("./IndexGradesService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeGradesRepository;
let fakeCacheProvider;
let indexGrades;
describe('IndexGrades', () => {
  beforeEach(() => {
    fakeGradesRepository = new _FakeGradesRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    indexGrades = new _IndexGradesService.default(fakeGradesRepository, fakeCacheProvider);
  });
  it('should be able to index all grades', async () => {
    const grade = await fakeGradesRepository.create({
      name: 'Grade Example',
      value: 100,
      year: '2020'
    });
    const anotherGrade = await fakeGradesRepository.create({
      name: 'Another Grade Example',
      value: 100,
      year: '2020'
    });
    const grades = await indexGrades.execute();
    expect(grades[0].id).toBe(grade.id);
    expect(grades[1].id).toBe(anotherGrade.id);
  });
  it('should be able to index all cached grades', async () => {
    const registerCache = jest.spyOn(fakeCacheProvider, 'register');
    await fakeGradesRepository.create({
      name: 'Grade Example',
      value: 100,
      year: '2020'
    });
    await fakeGradesRepository.create({
      name: 'Another Grade Example',
      value: 100,
      year: '2020'
    });
    await indexGrades.execute();
    await indexGrades.execute();
    expect(registerCache).toBeCalledTimes(1);
  });
});