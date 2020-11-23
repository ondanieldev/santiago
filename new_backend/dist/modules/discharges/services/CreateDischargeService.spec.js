"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakePaymentsRepository = _interopRequireDefault(require("../../payments/repositories/fakes/FakePaymentsRepository"));

var _FakeDischargesRepository = _interopRequireDefault(require("../repositories/fakes/FakeDischargesRepository"));

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _CreateDischargeService = _interopRequireDefault(require("./CreateDischargeService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakePaymentsRepository;
let fakeDischargesRepository;
let fakeUsersRepository;
let fakeCacheProvider;
let createDischarge;
describe('CreateDischarge', () => {
  beforeEach(() => {
    fakePaymentsRepository = new _FakePaymentsRepository.default();
    fakeDischargesRepository = new _FakeDischargesRepository.default();
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createDischarge = new _CreateDischargeService.default(fakePaymentsRepository, fakeDischargesRepository, fakeUsersRepository, fakeCacheProvider);
  });
  it('should be able to discharge a payment by passing payment id', async () => {
    const user = await fakeUsersRepository.create({
      username: 'username',
      password: 'password',
      profile_id: 'profile'
    });
    const payment = await fakePaymentsRepository.create({
      amount: 100,
      debit_id: 'debit',
      method: 'cash',
      user_id: 'any-user',
      receipt: 'receipt'
    });
    await createDischarge.execute({
      payment_id: payment.id,
      user_id: user.id
    });
    const paymentAfterDischarged = await fakePaymentsRepository.findById(payment.id);
    expect(paymentAfterDischarged?.discharged).toBe(true);
  });
  it('should not be able to discharge a payment if the user is logged out', async () => {
    await expect(createDischarge.execute({
      payment_id: 'payment',
      user_id: 'user'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to discharge a payment that does not exists', async () => {
    const user = await fakeUsersRepository.create({
      username: 'username',
      password: 'password',
      profile_id: 'profile'
    });
    await expect(createDischarge.execute({
      payment_id: 'non-existing-payment',
      user_id: user.id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to discharge a already discharged payment', async () => {
    const user = await fakeUsersRepository.create({
      username: 'username',
      password: 'password',
      profile_id: 'profile'
    });
    const payment = await fakePaymentsRepository.create({
      amount: 100,
      debit_id: 'debit',
      method: 'cash',
      user_id: 'any-user',
      receipt: 'receipt'
    });
    await createDischarge.execute({
      payment_id: payment.id,
      user_id: user.id
    });
    await expect(createDischarge.execute({
      payment_id: payment.id,
      user_id: user.id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});