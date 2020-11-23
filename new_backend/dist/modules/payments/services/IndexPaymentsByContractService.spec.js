"use strict";

var _FakeContractsRepository = _interopRequireDefault(require("../../contracts/repositories/fakes/FakeContractsRepository"));

var _FakeDebitsRepository = _interopRequireDefault(require("../../debits/repositories/fakes/FakeDebitsRepository"));

var _FakePaymentsRepository = _interopRequireDefault(require("../repositories/fakes/FakePaymentsRepository"));

var _IndexPaymentsByContractService = _interopRequireDefault(require("./IndexPaymentsByContractService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakePaymentsRepository;
let fakeContractsRepository;
let fakeDebitsRepository;
let indexPaymentsByContract;
describe('IndexPaymentsByContract', () => {
  beforeEach(() => {
    fakePaymentsRepository = new _FakePaymentsRepository.default();
    fakeContractsRepository = new _FakeContractsRepository.default();
    fakeDebitsRepository = new _FakeDebitsRepository.default();
    indexPaymentsByContract = new _IndexPaymentsByContractService.default(fakePaymentsRepository);
  });
  it('should be able to index all contracts payments', async () => {
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      student_id: 'student',
      status: 'active'
    });
    const debit = await fakeDebitsRepository.create({
      contract_id: contract.id,
      description: 'new installment',
      payment_limit_date: new Date(),
      value: 100,
      type: 'installment'
    });
    const payment = await fakePaymentsRepository.create({
      amount: 100,
      debit_id: debit.id,
      method: 'cash',
      user_id: 'user',
      receipt: 'recibo'
    });
    Object.assign(payment, {
      debit
    });
    await fakePaymentsRepository.save(payment);
    const payments = await indexPaymentsByContract.execute(contract.id);
    expect(payments[0].id).toBe(payment.id);
  });
});