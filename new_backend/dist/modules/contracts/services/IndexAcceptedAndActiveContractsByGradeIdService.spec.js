"use strict";

var _FakeContractsRepository = _interopRequireDefault(require("../repositories/fakes/FakeContractsRepository"));

var _FakeGradesRepository = _interopRequireDefault(require("../../grades/repositories/fakes/FakeGradesRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _IndexAcceptedAndActiveContractsByGradeIdService = _interopRequireDefault(require("./IndexAcceptedAndActiveContractsByGradeIdService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeContractsRepository;
let fakeGradesRepository;
let fakeCacheProvider;
let indexAcceptedAndActiveContractsByGradeId;
describe('IndexAcceptedAndActiveContracts', () => {
  beforeEach(() => {
    fakeContractsRepository = new _FakeContractsRepository.default();
    fakeGradesRepository = new _FakeGradesRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    indexAcceptedAndActiveContractsByGradeId = new _IndexAcceptedAndActiveContractsByGradeIdService.default(fakeContractsRepository, fakeCacheProvider);
  });
  it('should be able to list all contracts with accepted or active status', async () => {
    const grade = await fakeGradesRepository.create({
      name: 'grade',
      value: 100,
      year: '2020'
    });
    const acceptedContract = await fakeContractsRepository.create({
      grade_id: grade.id,
      status: 'accepted',
      student_id: 'student1'
    });
    const activeContract = await fakeContractsRepository.create({
      grade_id: grade.id,
      status: 'active',
      student_id: 'student2'
    });
    const contracts = await indexAcceptedAndActiveContractsByGradeId.execute(grade.id);
    expect(contracts[0].id).toBe(acceptedContract.id);
    expect(contracts[1].id).toBe(activeContract.id);
  });
});