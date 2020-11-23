"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _DeleteExtraDebitService = _interopRequireDefault(require("./DeleteExtraDebitService"));

var _FakeDebitsRepository = _interopRequireDefault(require("../repositories/fakes/FakeDebitsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeDebitsRepository;
let deleteExtraDebit;
describe('DeleteExtraDebit', () => {
  beforeEach(() => {
    fakeDebitsRepository = new _FakeDebitsRepository.default();
    deleteExtraDebit = new _DeleteExtraDebitService.default(fakeDebitsRepository);
  });
  it('should be able to remove type extra debit', async () => {
    const deleteFunction = jest.spyOn(fakeDebitsRepository, 'deleteTypeExtra');
    const debit = await fakeDebitsRepository.create({
      contract_id: 'contract',
      description: 'Extra debit',
      payment_limit_date: new Date(),
      type: 'extra',
      value: 100,
      discount: 0
    });
    await deleteExtraDebit.execute(debit.id);
    expect(deleteFunction).toHaveBeenCalledWith(debit.id);
  });
  it('should not be able to remove a non-existing debit', async () => {
    await expect(deleteExtraDebit.execute('non-existing-debit')).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to remove a non-extra-type debit', async () => {
    const debit = await fakeDebitsRepository.create({
      contract_id: 'contract',
      description: 'non-extra-type',
      payment_limit_date: new Date(),
      type: 'installment',
      value: 100,
      discount: 0
    });
    await expect(deleteExtraDebit.execute(debit.id)).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to remove a debit that is already paid', async () => {
    const debit = await fakeDebitsRepository.create({
      contract_id: 'contract',
      description: 'Extra debit',
      payment_limit_date: new Date(),
      type: 'extra',
      value: 100,
      discount: 0
    });
    Object.assign(debit, {
      paid: true
    });
    await fakeDebitsRepository.save(debit);
    await expect(deleteExtraDebit.execute(debit.id)).rejects.toBeInstanceOf(_AppError.default);
  });
});