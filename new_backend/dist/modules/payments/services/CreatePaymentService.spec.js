"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakePersonsRepository = _interopRequireDefault(require("../../persons/repositories/fakes/FakePersonsRepository"));

var _FakeAgreementsRepository = _interopRequireDefault(require("../../agreements/repositories/fakes/FakeAgreementsRepository"));

var _FakeDebitsRepository = _interopRequireDefault(require("../../debits/repositories/fakes/FakeDebitsRepository"));

var _FakePaymentsRepository = _interopRequireDefault(require("../repositories/fakes/FakePaymentsRepository"));

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _FakeContractsRepository = _interopRequireDefault(require("../../contracts/repositories/fakes/FakeContractsRepository"));

var _FakeReceiptProvider = _interopRequireDefault(require("../../../shared/container/providers/ReceiptProvider/fakes/FakeReceiptProvider"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _CreatePaymentService = _interopRequireDefault(require("./CreatePaymentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createPayment;
let fakePersonsRepository;
let fakeAgreementsRepository;
let fakeDebitsRepository;
let fakePaymentsRepository;
let fakeUsersRepository;
let fakeContractsRepository;
let fakeReceiptProvider;
let fakeStorageProvider;
describe('PayDebit', () => {
  beforeEach(() => {
    fakePersonsRepository = new _FakePersonsRepository.default();
    fakeAgreementsRepository = new _FakeAgreementsRepository.default();
    fakeDebitsRepository = new _FakeDebitsRepository.default();
    fakePaymentsRepository = new _FakePaymentsRepository.default();
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeContractsRepository = new _FakeContractsRepository.default();
    fakeReceiptProvider = new _FakeReceiptProvider.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    createPayment = new _CreatePaymentService.default(fakeDebitsRepository, fakePaymentsRepository, fakeUsersRepository, fakeContractsRepository, fakeReceiptProvider, fakeStorageProvider);
  });
  it('should be able to pay a debit by changing its paid status, creating a new payment and generating receipt', async () => {
    const generateReceipt = jest.spyOn(fakeReceiptProvider, 'generate');
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      student_id: 'student',
      status: 'underAnalysis'
    });
    const person = await fakePersonsRepository.create({
      address_cep: '',
      address_city: '',
      address_neighborhood: '',
      address_number: '',
      address_street: '',
      birth_date: new Date(),
      civil_state: 'single',
      commercial_phone: '',
      cpf: '',
      education_level: 'elementary_completed',
      email: '',
      monthly_income: 'a_class',
      nacionality: '',
      name: '',
      personal_phone: '',
      profission: '',
      residencial_phone: '',
      rg: '',
      workplace: '',
      address_complement: ''
    });
    const agreement = await fakeAgreementsRepository.create({
      contract_id: contract.id,
      person_id: person.id,
      responsible_type: 'financial'
    });
    Object.assign(agreement, person);
    Object.assign(contract, {
      agreements: [agreement]
    });
    await fakeContractsRepository.save(contract);
    const debit = await fakeDebitsRepository.create({
      contract_id: contract.id,
      description: 'description',
      payment_limit_date: new Date(),
      value: 100
    });
    const user = await fakeUsersRepository.create({
      username: 'username',
      password: 'password',
      profile_id: 'profile'
    });
    await createPayment.execute({
      user_id: user.id,
      debit_id: debit.id,
      method: 'cash'
    });
    const debitAfterPaid = await fakeDebitsRepository.findById(debit.id);
    expect(debitAfterPaid?.paid).toBe(true);
    expect(generateReceipt).toBeCalled();
  });
  it('should not be able to pay a debit if the user is logged out', async () => {
    await expect(createPayment.execute({
      debit_id: 'debit',
      method: 'cash',
      user_id: 'non-logged-user'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to pay a debit if the debit does not exists', async () => {
    const user = await fakeUsersRepository.create({
      username: 'username',
      password: 'password',
      profile_id: 'profile'
    });
    await expect(createPayment.execute({
      user_id: user.id,
      debit_id: 'non-existing-debit',
      method: 'cash'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to pay a debit that is already paid', async () => {
    const user = await fakeUsersRepository.create({
      username: 'username',
      password: 'password',
      profile_id: 'profile'
    });
    const contract = await fakeContractsRepository.create({
      grade_id: 'grade',
      student_id: 'student',
      status: 'underAnalysis'
    });
    const person = await fakePersonsRepository.create({
      address_cep: '',
      address_city: '',
      address_neighborhood: '',
      address_number: '',
      address_street: '',
      birth_date: new Date(),
      civil_state: 'single',
      commercial_phone: '',
      cpf: '',
      education_level: 'elementary_completed',
      email: '',
      monthly_income: 'a_class',
      nacionality: '',
      name: '',
      personal_phone: '',
      profission: '',
      residencial_phone: '',
      rg: '',
      workplace: '',
      address_complement: ''
    });
    const agreement = await fakeAgreementsRepository.create({
      contract_id: contract.id,
      person_id: person.id,
      responsible_type: 'financial'
    });
    Object.assign(agreement, person);
    Object.assign(contract, {
      agreements: [agreement]
    });
    await fakeContractsRepository.save(contract);
    const debit = await fakeDebitsRepository.create({
      contract_id: contract.id,
      description: 'description',
      payment_limit_date: new Date(),
      value: 100
    });
    await createPayment.execute({
      user_id: user.id,
      debit_id: debit.id,
      method: 'cash'
    });
    await expect(createPayment.execute({
      user_id: user.id,
      debit_id: debit.id,
      method: 'cash'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to pay an enrollment typed debit', async () => {
    const user = await fakeUsersRepository.create({
      username: 'username',
      password: 'password',
      profile_id: 'profile'
    });
    const debit = await fakeDebitsRepository.create({
      contract_id: 'contract',
      description: 'description',
      payment_limit_date: new Date(),
      value: 100,
      type: 'enrollment'
    });
    await expect(createPayment.execute({
      user_id: user.id,
      debit_id: debit.id,
      method: 'cash'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});