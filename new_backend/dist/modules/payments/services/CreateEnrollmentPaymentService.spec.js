"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeDebitsRepository = _interopRequireDefault(require("../../debits/repositories/fakes/FakeDebitsRepository"));

var _FakePaymentsRepository = _interopRequireDefault(require("../repositories/fakes/FakePaymentsRepository"));

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _FakeContractsRepository = _interopRequireDefault(require("../../contracts/repositories/fakes/FakeContractsRepository"));

var _FakeStudentsRepository = _interopRequireDefault(require("../../students/repositories/fakes/FakeStudentsRepository"));

var _FakePersonsRepository = _interopRequireDefault(require("../../persons/repositories/fakes/FakePersonsRepository"));

var _FakeProfilesRepository = _interopRequireDefault(require("../../profiles/repositories/fakes/FakeProfilesRepository"));

var _FakeGradesRepository = _interopRequireDefault(require("../../grades/repositories/fakes/FakeGradesRepository"));

var _FakeReceiptProvider = _interopRequireDefault(require("../../../shared/container/providers/ReceiptProvider/fakes/FakeReceiptProvider"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _FakeHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/fakes/FakeHashProvider"));

var _CreateEnrollmentPaymentService = _interopRequireDefault(require("./CreateEnrollmentPaymentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeDebitsRepository;
let fakePaymentsRepository;
let fakeUsersRepository;
let fakeContractsRepository;
let fakeStudentsRepository;
let fakePersonsRepository;
let fakeProfilesRepository;
let fakeGradesRepository;
let fakeReceiptProvider;
let fakeStorageProvider;
let fakeCacheProvider;
let fakeMailProvider;
let fakeHashProvider;
let createEnrollmentPayment;
describe('PayDebit', () => {
  beforeEach(() => {
    fakeDebitsRepository = new _FakeDebitsRepository.default();
    fakePaymentsRepository = new _FakePaymentsRepository.default();
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeContractsRepository = new _FakeContractsRepository.default();
    fakeStudentsRepository = new _FakeStudentsRepository.default();
    fakePersonsRepository = new _FakePersonsRepository.default();
    fakeProfilesRepository = new _FakeProfilesRepository.default();
    fakeGradesRepository = new _FakeGradesRepository.default();
    fakeReceiptProvider = new _FakeReceiptProvider.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeMailProvider = new _FakeMailProvider.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createEnrollmentPayment = new _CreateEnrollmentPaymentService.default(fakeDebitsRepository, fakePaymentsRepository, fakeUsersRepository, fakeContractsRepository, fakeStudentsRepository, fakePersonsRepository, fakeProfilesRepository, fakeGradesRepository, fakeReceiptProvider, fakeStorageProvider, fakeCacheProvider, fakeMailProvider, fakeHashProvider);
  });
  it('should be able to pay a enrollment debit by changing its paid status, creating a new payment, generating receipt, generating users and sending mails', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const grade = await fakeGradesRepository.create({
      name: 'grade',
      value: 100,
      year: '2020'
    });
    const contract = await fakeContractsRepository.create({
      grade_id: grade.id,
      student_id: 'student',
      status: 'underAnalysis'
    });
    const student = await fakeStudentsRepository.create({
      birth_city: 'city',
      birth_date: new Date(),
      birth_state: 'state',
      ease_relating: true,
      father_name: 'father',
      gender: 'male',
      mother_name: 'mother',
      nacionality: 'nacionality',
      name: 'John Doe',
      race: 'white'
    });
    const responsible = await fakePersonsRepository.create({
      address_cep: 'cep',
      address_city: 'city',
      address_neighborhood: 'neighborhood',
      address_number: '1',
      address_street: 'strret',
      birth_date: new Date(),
      civil_state: 'single',
      commercial_phone: '123456',
      cpf: 'cpf',
      education_level: 'elementary_completed',
      email: 'johntre@gmail.com',
      income_tax: true,
      monthly_income: 'a_class',
      nacionality: 'nacionality',
      name: 'John Tre',
      personal_phone: '123456',
      profission: 'profisison',
      residencial_phone: '123456',
      rg: 'rg',
      workplace: 'woork',
      address_complement: 'complement'
    });
    contract.student = student;
    contract.agreements.push({
      person: responsible,
      contract,
      contract_id: contract.id,
      id: 'agreement',
      person_id: responsible.id,
      responsible_type: 'financial',
      created_at: new Date()
    });
    await fakeContractsRepository.save(contract);
    const debit = await fakeDebitsRepository.create({
      contract_id: contract.id,
      description: 'description',
      payment_limit_date: new Date(),
      value: 100,
      type: 'enrollment'
    });
    const user = await fakeUsersRepository.create({
      username: 'paid-user',
      password: '123456',
      profile_id: 'paid-profile'
    });
    const payment = await createEnrollmentPayment.execute({
      debit_id: debit.id,
      method: 'cash',
      user_id: user.id
    });
    const debitAfterPayment = await fakeDebitsRepository.findById(debit.id);
    const contractAfterPayment = await fakeContractsRepository.findById(contract.id);
    const studentAfterPayment = await fakeStudentsRepository.findById(student.id);
    const responsibleAfterPayment = await fakePersonsRepository.findById(responsible.id);
    expect(payment).toHaveProperty('receipt');
    expect(debitAfterPayment?.paid).toBe(true);
    expect(contractAfterPayment?.status).toBe('active');
    expect(studentAfterPayment).toHaveProperty('user_id');
    expect(responsibleAfterPayment).toHaveProperty('user_id');
    expect(sendMail).toBeCalled();
  });
  it('should be able to pay a enrollment debit by changing its paid status, creating a new payment, generating receipt, generating users and sending mails with female articles', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const grade = await fakeGradesRepository.create({
      name: 'grade',
      value: 100,
      year: '2020'
    });
    const contract = await fakeContractsRepository.create({
      grade_id: grade.id,
      student_id: 'student',
      status: 'underAnalysis'
    });
    const student = await fakeStudentsRepository.create({
      birth_city: 'city',
      birth_date: new Date(),
      birth_state: 'state',
      ease_relating: true,
      father_name: 'father',
      gender: 'female',
      mother_name: 'mother',
      nacionality: 'nacionality',
      name: 'Jane Doe',
      race: 'white'
    });
    const responsible = await fakePersonsRepository.create({
      address_cep: 'cep',
      address_city: 'city',
      address_neighborhood: 'neighborhood',
      address_number: '1',
      address_street: 'strret',
      birth_date: new Date(),
      civil_state: 'single',
      commercial_phone: '123456',
      cpf: 'cpf',
      education_level: 'elementary_completed',
      email: 'johntre@gmail.com',
      income_tax: true,
      monthly_income: 'a_class',
      nacionality: 'nacionality',
      name: 'John Tre',
      personal_phone: '123456',
      profission: 'profisison',
      residencial_phone: '123456',
      rg: 'rg',
      workplace: 'woork',
      address_complement: 'complement'
    });
    contract.student = student;
    contract.agreements.push({
      person: responsible,
      contract,
      contract_id: contract.id,
      id: 'agreement',
      person_id: responsible.id,
      responsible_type: 'financial',
      created_at: new Date()
    });
    await fakeContractsRepository.save(contract);
    const debit = await fakeDebitsRepository.create({
      contract_id: contract.id,
      description: 'description',
      payment_limit_date: new Date(),
      value: 100,
      type: 'enrollment'
    });
    const user = await fakeUsersRepository.create({
      username: 'paid-user',
      password: '123456',
      profile_id: 'paid-profile'
    });
    const payment = await createEnrollmentPayment.execute({
      debit_id: debit.id,
      method: 'cash',
      user_id: user.id
    });
    const debitAfterPayment = await fakeDebitsRepository.findById(debit.id);
    const contractAfterPayment = await fakeContractsRepository.findById(contract.id);
    const studentAfterPayment = await fakeStudentsRepository.findById(student.id);
    const responsibleAfterPayment = await fakePersonsRepository.findById(responsible.id);
    expect(payment).toHaveProperty('receipt');
    expect(debitAfterPayment?.paid).toBe(true);
    expect(contractAfterPayment?.status).toBe('active');
    expect(studentAfterPayment).toHaveProperty('user_id');
    expect(responsibleAfterPayment).toHaveProperty('user_id');
    expect(sendMail).toBeCalled();
  });
  it('should be able to pay a enrollment debit by changing its paid status, creating a new payment, generating receipt, generating users and sending mails without generate profiles', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeProfilesRepository.create({
      name: 'Aluno',
      create_extra_debits_permiss: false,
      create_new_enrollments_permiss: false,
      crud_extra_debits_permiss: false,
      crud_grades_permiss: false,
      crud_profiles_permiss: false,
      crud_users_permiss: false,
      discharge_payments_permiss: false,
      generate_documents_permiss: false,
      pay_debits_permiss: false,
      validate_enrollments_permiss: false
    });
    await fakeProfilesRepository.create({
      name: 'Responsável',
      create_extra_debits_permiss: false,
      create_new_enrollments_permiss: false,
      crud_extra_debits_permiss: false,
      crud_grades_permiss: false,
      crud_profiles_permiss: false,
      crud_users_permiss: false,
      discharge_payments_permiss: false,
      generate_documents_permiss: false,
      pay_debits_permiss: false,
      validate_enrollments_permiss: false
    });
    const grade = await fakeGradesRepository.create({
      name: 'grade',
      value: 100,
      year: '2020'
    });
    const contract = await fakeContractsRepository.create({
      grade_id: grade.id,
      student_id: 'student',
      status: 'underAnalysis'
    });
    const student = await fakeStudentsRepository.create({
      birth_city: 'city',
      birth_date: new Date(),
      birth_state: 'state',
      ease_relating: true,
      father_name: 'father',
      gender: 'male',
      mother_name: 'mother',
      nacionality: 'nacionality',
      name: 'John Doe',
      race: 'white'
    });
    const responsible = await fakePersonsRepository.create({
      address_cep: 'cep',
      address_city: 'city',
      address_neighborhood: 'neighborhood',
      address_number: '1',
      address_street: 'strret',
      birth_date: new Date(),
      civil_state: 'single',
      commercial_phone: '123456',
      cpf: 'cpf',
      education_level: 'elementary_completed',
      email: 'johntre@gmail.com',
      income_tax: true,
      monthly_income: 'a_class',
      nacionality: 'nacionality',
      name: 'John Tre',
      personal_phone: '123456',
      profission: 'profisison',
      residencial_phone: '123456',
      rg: 'rg',
      workplace: 'woork',
      address_complement: 'complement'
    });
    contract.student = student;
    contract.agreements.push({
      person: responsible,
      contract,
      contract_id: contract.id,
      id: 'agreement',
      person_id: responsible.id,
      responsible_type: 'financial',
      created_at: new Date()
    });
    await fakeContractsRepository.save(contract);
    const debit = await fakeDebitsRepository.create({
      contract_id: contract.id,
      description: 'description',
      payment_limit_date: new Date(),
      value: 100,
      type: 'enrollment'
    });
    const user = await fakeUsersRepository.create({
      username: 'paid-user',
      password: '123456',
      profile_id: 'paid-profile'
    });
    const payment = await createEnrollmentPayment.execute({
      debit_id: debit.id,
      method: 'cash',
      user_id: user.id
    });
    const debitAfterPayment = await fakeDebitsRepository.findById(debit.id);
    const contractAfterPayment = await fakeContractsRepository.findById(contract.id);
    const studentAfterPayment = await fakeStudentsRepository.findById(student.id);
    const responsibleAfterPayment = await fakePersonsRepository.findById(responsible.id);
    expect(payment).toHaveProperty('receipt');
    expect(debitAfterPayment?.paid).toBe(true);
    expect(contractAfterPayment?.status).toBe('active');
    expect(studentAfterPayment).toHaveProperty('user_id');
    expect(responsibleAfterPayment).toHaveProperty('user_id');
    expect(sendMail).toBeCalled();
  });
  it('should not be able to pay a enrollment debit if the user is logged out', async () => {
    await expect(createEnrollmentPayment.execute({
      user_id: 'user-logged-out',
      debit_id: 'debit',
      method: 'cash'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to pay a enrollment debit if the debit does not exists', async () => {
    const user = await fakeUsersRepository.create({
      username: 'paid-user',
      password: '123456',
      profile_id: 'paid-profile'
    });
    await expect(createEnrollmentPayment.execute({
      user_id: user.id,
      debit_id: 'debit',
      method: 'cash'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to pay a enrollment debit if the debit is already paid', async () => {
    const grade = await fakeGradesRepository.create({
      name: 'grade',
      value: 100,
      year: '2020'
    });
    const contract = await fakeContractsRepository.create({
      grade_id: grade.id,
      student_id: 'student',
      status: 'underAnalysis'
    });
    const student = await fakeStudentsRepository.create({
      birth_city: 'city',
      birth_date: new Date(),
      birth_state: 'state',
      ease_relating: true,
      father_name: 'father',
      gender: 'male',
      mother_name: 'mother',
      nacionality: 'nacionality',
      name: 'John Doe',
      race: 'white'
    });
    const responsible = await fakePersonsRepository.create({
      address_cep: 'cep',
      address_city: 'city',
      address_neighborhood: 'neighborhood',
      address_number: '1',
      address_street: 'strret',
      birth_date: new Date(),
      civil_state: 'single',
      commercial_phone: '123456',
      cpf: 'cpf',
      education_level: 'elementary_completed',
      email: 'johntre@gmail.com',
      income_tax: true,
      monthly_income: 'a_class',
      nacionality: 'nacionality',
      name: 'John Tre',
      personal_phone: '123456',
      profission: 'profisison',
      residencial_phone: '123456',
      rg: 'rg',
      workplace: 'woork',
      address_complement: 'complement'
    });
    contract.student = student;
    contract.agreements.push({
      person: responsible,
      contract,
      contract_id: contract.id,
      id: 'agreement',
      person_id: responsible.id,
      responsible_type: 'financial',
      created_at: new Date()
    });
    await fakeContractsRepository.save(contract);
    const debit = await fakeDebitsRepository.create({
      contract_id: contract.id,
      description: 'description',
      payment_limit_date: new Date(),
      value: 100,
      type: 'enrollment'
    });
    const user = await fakeUsersRepository.create({
      username: 'paid-user',
      password: '123456',
      profile_id: 'paid-profile'
    });
    await createEnrollmentPayment.execute({
      debit_id: debit.id,
      method: 'cash',
      user_id: user.id
    });
    await expect(createEnrollmentPayment.execute({
      debit_id: debit.id,
      method: 'cash',
      user_id: user.id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to pay a non-enrollment debit', async () => {
    const debit = await fakeDebitsRepository.create({
      contract_id: 'contract',
      description: 'description',
      payment_limit_date: new Date(),
      value: 100,
      type: 'installment'
    });
    const user = await fakeUsersRepository.create({
      username: 'paid-user',
      password: '123456',
      profile_id: 'paid-profile'
    });
    await expect(createEnrollmentPayment.execute({
      debit_id: debit.id,
      method: 'cash',
      user_id: user.id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to pay a enrollment debit if the contract does not exists', async () => {
    const debit = await fakeDebitsRepository.create({
      contract_id: 'non-existing-contract',
      description: 'description',
      payment_limit_date: new Date(),
      value: 100,
      type: 'enrollment'
    });
    const user = await fakeUsersRepository.create({
      username: 'paid-user',
      password: '123456',
      profile_id: 'paid-profile'
    });
    await expect(createEnrollmentPayment.execute({
      debit_id: debit.id,
      method: 'cash',
      user_id: user.id
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});