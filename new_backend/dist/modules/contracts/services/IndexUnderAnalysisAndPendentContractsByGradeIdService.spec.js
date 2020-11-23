"use strict";

var _FakeContractsRepository = _interopRequireDefault(require("../repositories/fakes/FakeContractsRepository"));

var _FakeGradesRepository = _interopRequireDefault(require("../../grades/repositories/fakes/FakeGradesRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _IndexUnderAnalysisAndPendentContractsByGradeIdService = _interopRequireDefault(require("./IndexUnderAnalysisAndPendentContractsByGradeIdService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeContractsRepository;
let fakeGradesRepository;
let fakeCacheProvider;
let indexUnderAnalysisAndPendentContractsByGrade;
describe('IndexUnderAnalysisAndPendentContracts', () => {
  beforeEach(() => {
    fakeContractsRepository = new _FakeContractsRepository.default();
    fakeGradesRepository = new _FakeGradesRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    indexUnderAnalysisAndPendentContractsByGrade = new _IndexUnderAnalysisAndPendentContractsByGradeIdService.default(fakeContractsRepository, fakeCacheProvider);
  });
  it('should be able to list all contracts with underAnalysis or pendent status', async () => {
    const grade = await fakeGradesRepository.create({
      name: 'grade',
      value: 100,
      year: '2020'
    });
    const pendentContract = await fakeContractsRepository.create({
      grade_id: grade.id,
      status: 'pendent',
      student_id: 'student1'
    });
    const underAnalysisContract = await fakeContractsRepository.create({
      grade_id: grade.id,
      status: 'underAnalysis',
      student_id: 'student2'
    });
    const contracts = await indexUnderAnalysisAndPendentContractsByGrade.execute(grade.id);
    expect(contracts[0].id).toBe(pendentContract.id);
    expect(contracts[1].id).toBe(underAnalysisContract.id);
  });
});