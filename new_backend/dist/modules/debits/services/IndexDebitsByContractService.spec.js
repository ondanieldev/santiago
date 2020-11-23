"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeDebitsRepository = _interopRequireDefault(require("../repositories/fakes/FakeDebitsRepository"));

var _FakeContractsRepository = _interopRequireDefault(require("../../contracts/repositories/fakes/FakeContractsRepository"));

var _IndexDebitsByContractService = _interopRequireDefault(require("./IndexDebitsByContractService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeDebitsRepository;
let fakeContractsRepository;
let indexDebitsByContract;
describe('IndexContractDebits', () => {
  beforeEach(() => {
    fakeDebitsRepository = new _FakeDebitsRepository.default();
    fakeContractsRepository = new _FakeContractsRepository.default();
    indexDebitsByContract = new _IndexDebitsByContractService.default(fakeDebitsRepository, fakeContractsRepository);
  });
  it('should be able to list all debits related to a contract', async () => {
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      status: 'accepted',
      student_id: 'student'
    });
    const debit = await fakeDebitsRepository.create({
      contract_id: contract.id,
      description: 'description',
      payment_limit_date: new Date(),
      discount: 0,
      type: 'installment',
      value: 1000
    });
    const debitsList = await indexDebitsByContract.execute(contract.id);
    expect(debitsList[0].id).toBe(debit.id);
  });
  it('should not be able to list debits that isnt related to a contract', async () => {
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      status: 'accepted',
      student_id: 'student'
    });
    const anotherContract = await fakeContractsRepository.create({
      grade_id: 'grade',
      status: 'accepted',
      student_id: 'student'
    });
    await fakeDebitsRepository.create({
      contract_id: anotherContract.id,
      description: 'description',
      payment_limit_date: new Date(),
      discount: 0,
      type: 'installment',
      value: 1000
    });
    const debitsList = await indexDebitsByContract.execute(contract.id);
    expect(debitsList).toStrictEqual([]);
  });
  it('should not be able to list debits of a non-existing contract', async () => {
    await expect(indexDebitsByContract.execute('non-existing-contract')).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to list debits of a non-aprooved contract', async () => {
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      status: 'underAnalysis',
      student_id: 'student'
    });
    await fakeDebitsRepository.create({
      contract_id: contract.id,
      description: 'description',
      payment_limit_date: new Date(),
      discount: 0,
      type: 'installment',
      value: 1000
    });
    await expect(indexDebitsByContract.execute(contract.id)).rejects.toBeInstanceOf(_AppError.default);
  });
});