"use strict";

var _FakeGradesRepository = _interopRequireDefault(require("../../grades/repositories/fakes/FakeGradesRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeContractsRepository = _interopRequireDefault(require("../repositories/fakes/FakeContractsRepository"));

var _IndexActiveContractsByGradeIdService = _interopRequireDefault(require("./IndexActiveContractsByGradeIdService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeContractsRepository;
let fakeGradesRepository;
let fakeCacheProvider;
let indexActiveContractsByGradeId;
describe('IndexActiveContractsByGradeId', () => {
  beforeEach(() => {
    fakeContractsRepository = new _FakeContractsRepository.default();
    fakeGradesRepository = new _FakeGradesRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    indexActiveContractsByGradeId = new _IndexActiveContractsByGradeIdService.default(fakeContractsRepository, fakeCacheProvider);
  });
  it('should be able to list all active contracts by grade id', async () => {
    const grade = await fakeGradesRepository.create({
      name: 'grade',
      value: 100,
      year: '2020'
    });
    const activeContractThatMatches = await fakeContractsRepository.create({
      grade_id: grade.id,
      student_id: 'student',
      status: 'active'
    });
    activeContractThatMatches.grade = grade;
    await fakeContractsRepository.save(activeContractThatMatches);
    await fakeContractsRepository.create({
      grade_id: 'another-grade',
      student_id: 'student',
      status: 'active'
    });
    await fakeContractsRepository.create({
      grade_id: 'grade',
      student_id: 'student',
      status: 'accepted'
    });
    const contracts = await indexActiveContractsByGradeId.execute(grade.id);
    expect(contracts).toEqual([activeContractThatMatches]);
  });
});