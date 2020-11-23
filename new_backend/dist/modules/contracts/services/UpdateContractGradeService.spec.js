"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeContractsRepository = _interopRequireDefault(require("../repositories/fakes/FakeContractsRepository"));

var _FakeGradesRepository = _interopRequireDefault(require("../../grades/repositories/fakes/FakeGradesRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _UpdateContractGradeService = _interopRequireDefault(require("./UpdateContractGradeService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeContractsRepository;
let fakeGradesRepository;
let fakeCacheProvider;
let updateContractGrade;
describe('UpdateContractGrade', () => {
  beforeEach(() => {
    fakeContractsRepository = new _FakeContractsRepository.default();
    fakeGradesRepository = new _FakeGradesRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    updateContractGrade = new _UpdateContractGradeService.default(fakeContractsRepository, fakeGradesRepository, fakeCacheProvider);
  });
  it('should be able to update the grade field of a contract by id', async () => {
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      status: 'underAnalysis',
      student_id: 'student'
    });
    const grade = await fakeGradesRepository.create({
      name: 'new-grade',
      value: 1000,
      year: '2020'
    });
    const updatedContract = await updateContractGrade.execute({
      contract_id: contract.id,
      grade_id: grade.id
    });
    expect(updatedContract.id).toBe(contract.id);
    expect(updatedContract.grade).toBe(grade);
  });
  it('should not be able to update the grade field of a contract with a non-existing grade', async () => {
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      status: 'underAnalysis',
      student_id: 'student'
    });
    await expect(updateContractGrade.execute({
      contract_id: contract.id,
      grade_id: 'non-existing-grade'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update the grade field of a non-existing contract', async () => {
    await expect(updateContractGrade.execute({
      contract_id: 'non-existing-contract',
      grade_id: 'new-grade'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});