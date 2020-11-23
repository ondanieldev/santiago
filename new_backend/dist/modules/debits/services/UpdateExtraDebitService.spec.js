"use strict";

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _UpdateExtraDebitService = _interopRequireDefault(require("./UpdateExtraDebitService"));

var _FakeDebitsRepository = _interopRequireDefault(require("../repositories/fakes/FakeDebitsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeDebitsRepository;
let updateExtraDebit;
describe('UpdateExtraDebit', () => {
  beforeEach(() => {
    fakeDebitsRepository = new _FakeDebitsRepository.default();
    updateExtraDebit = new _UpdateExtraDebitService.default(fakeDebitsRepository);
  });
  it('should be able to update type extra debit', async () => {
    const updateFunction = jest.spyOn(fakeDebitsRepository, 'save');
    const debit = await fakeDebitsRepository.create({
      contract_id: 'contract',
      description: 'description',
      payment_limit_date: (0, _dateFns.addDays)(new Date(), 1),
      value: 100,
      discount: 0,
      type: 'extra'
    });
    const updatedDebit = await updateExtraDebit.execute({
      id: debit.id,
      description: 'new-description',
      payment_limit_date: (0, _dateFns.addDays)(new Date(), 2),
      value: 200,
      discount: 10
    });
    const debitAfterUpdate = await fakeDebitsRepository.findById(debit.id);
    expect(updateFunction).toHaveBeenCalledWith(debit);
    expect(debitAfterUpdate).toEqual(updatedDebit);
  });
  it('should not be able to update a type extra debit that does not exist', async () => {
    await expect(updateExtraDebit.execute({
      id: 'non-existing-debit',
      description: 'description',
      payment_limit_date: (0, _dateFns.addDays)(new Date(), 1),
      value: 100,
      discount: 0
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update a type extra debit that is already paid', async () => {
    const debit = await fakeDebitsRepository.create({
      contract_id: 'contract',
      description: 'description',
      payment_limit_date: (0, _dateFns.addDays)(new Date(), 1),
      value: 100,
      discount: 0,
      type: 'extra'
    });
    debit.paid = true;
    await fakeDebitsRepository.save(debit);
    await expect(updateExtraDebit.execute({
      id: debit.id,
      description: 'trying to update a debit that is already paid',
      payment_limit_date: (0, _dateFns.addDays)(new Date(), 1),
      value: 100,
      discount: 0
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update a non-type-extra debit', async () => {
    const debit = await fakeDebitsRepository.create({
      contract_id: 'contract',
      description: 'description',
      payment_limit_date: (0, _dateFns.addDays)(new Date(), 1),
      value: 100,
      discount: 0,
      type: 'installment'
    });
    await expect(updateExtraDebit.execute({
      id: debit.id,
      description: 'trying to update a debit that is not extra type',
      payment_limit_date: (0, _dateFns.addDays)(new Date(), 1),
      value: 100,
      discount: 0
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update a type extra debit with a past limit date', async () => {
    const debit = await fakeDebitsRepository.create({
      contract_id: 'contract',
      description: 'description',
      payment_limit_date: (0, _dateFns.addDays)(new Date(), 1),
      value: 100,
      discount: 0,
      type: 'extra'
    });
    await expect(updateExtraDebit.execute({
      id: debit.id,
      description: 'trying to update with a past date',
      payment_limit_date: (0, _dateFns.subDays)(new Date(), 1),
      value: 100,
      discount: 0
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update a type extra debit with a negative discount', async () => {
    const debit = await fakeDebitsRepository.create({
      contract_id: 'contract',
      description: 'description',
      payment_limit_date: (0, _dateFns.addDays)(new Date(), 1),
      value: 100,
      discount: 0,
      type: 'extra'
    });
    await expect(updateExtraDebit.execute({
      id: debit.id,
      description: 'trying to update with a negative discount',
      payment_limit_date: (0, _dateFns.addDays)(new Date(), 1),
      value: 100,
      discount: -10
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create a new type extra debit with a negative value', async () => {
    const debit = await fakeDebitsRepository.create({
      contract_id: 'contract',
      description: 'description',
      payment_limit_date: (0, _dateFns.addDays)(new Date(), 1),
      value: 100,
      discount: 0,
      type: 'extra'
    });
    await expect(updateExtraDebit.execute({
      id: debit.id,
      description: 'trying to update with a negative value',
      payment_limit_date: (0, _dateFns.addDays)(new Date(), 1),
      value: -100,
      discount: 0
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});