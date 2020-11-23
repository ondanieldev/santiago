"use strict";

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeContractsRepository = _interopRequireDefault(require("../../contracts/repositories/fakes/FakeContractsRepository"));

var _CreateExtraDebitService = _interopRequireDefault(require("./CreateExtraDebitService"));

var _FakeDebitsRepository = _interopRequireDefault(require("../repositories/fakes/FakeDebitsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeDebitsRepository;
let fakeContractsRepository;
let createExtraDebitService;
describe('CreateExtraDebit', () => {
  beforeEach(() => {
    fakeDebitsRepository = new _FakeDebitsRepository.default();
    fakeContractsRepository = new _FakeContractsRepository.default();
    createExtraDebitService = new _CreateExtraDebitService.default(fakeDebitsRepository, fakeContractsRepository);
  });
  it('should be able to create a new type extra debit', async () => {
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      student_id: 'student',
      status: 'active'
    });
    const debit = await createExtraDebitService.execute({
      contract_id: contract.id,
      description: 'Extra debit',
      payment_limit_date: (0, _dateFns.addDays)(new Date(), 1),
      type: 'extra',
      value: 100,
      discount: 0
    });
    expect(debit).toHaveProperty('id');
  });
  it('should not be able to create a new type extra debit attached to a non-existing contract', async () => {
    await expect(createExtraDebitService.execute({
      contract_id: 'non-existing-contract',
      description: 'Extra debit',
      payment_limit_date: (0, _dateFns.addDays)(new Date(), 1),
      type: 'extra',
      value: 100,
      discount: 0
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create a new type extra debit attached to a non-active contract', async () => {
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      student_id: 'student',
      status: 'accepted'
    });
    await expect(createExtraDebitService.execute({
      contract_id: contract.id,
      description: 'Extra debit',
      payment_limit_date: (0, _dateFns.addDays)(new Date(), 1),
      type: 'extra',
      value: 100,
      discount: 0
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create a new type extra debit with a past limit date', async () => {
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      student_id: 'student',
      status: 'active'
    });
    await expect(createExtraDebitService.execute({
      contract_id: contract.id,
      description: 'Extra debit',
      payment_limit_date: (0, _dateFns.subDays)(new Date(), 1),
      type: 'extra',
      value: 100,
      discount: 0
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create a new type extra debit with a negative discount', async () => {
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      student_id: 'student',
      status: 'active'
    });
    await expect(createExtraDebitService.execute({
      contract_id: contract.id,
      description: 'Extra debit',
      payment_limit_date: (0, _dateFns.addDays)(new Date(), 1),
      type: 'extra',
      value: 100,
      discount: -1
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create a new type extra debit with a negative value', async () => {
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      student_id: 'student',
      status: 'active'
    });
    await expect(createExtraDebitService.execute({
      contract_id: contract.id,
      description: 'Extra debit',
      payment_limit_date: (0, _dateFns.addDays)(new Date(), 1),
      type: 'extra',
      value: -1,
      discount: 0
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});