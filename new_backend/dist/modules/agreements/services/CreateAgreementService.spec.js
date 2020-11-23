"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakePersonsRepository = _interopRequireDefault(require("../../persons/repositories/fakes/FakePersonsRepository"));

var _FakeContractsRepository = _interopRequireDefault(require("../../contracts/repositories/fakes/FakeContractsRepository"));

var _FakeAgreementsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAgreementsRepository"));

var _CreateAgreementService = _interopRequireDefault(require("./CreateAgreementService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAgreementsRepository;
let fakeContractsRepository;
let fakePersonsRepository;
let createAgreement;
describe('CreateAgreement', () => {
  beforeEach(() => {
    fakeAgreementsRepository = new _FakeAgreementsRepository.default();
    fakeContractsRepository = new _FakeContractsRepository.default();
    fakePersonsRepository = new _FakePersonsRepository.default();
    createAgreement = new _CreateAgreementService.default(fakeAgreementsRepository, fakeContractsRepository, fakePersonsRepository);
  });
  it('should be able to create a new agreement between a person and a contract', async () => {
    const person = await fakePersonsRepository.create({
      address_cep: 'CEP',
      address_city: 'City',
      address_neighborhood: 'Neighborhood',
      address_number: '01',
      address_street: 'Street',
      birth_date: new Date(),
      civil_state: 'single',
      commercial_phone: '00',
      cpf: '53318849545',
      education_level: 'elementary_completed',
      email: 'johndoe@example.com',
      income_tax: true,
      monthly_income: 'a_class',
      nacionality: 'Nacionality',
      name: 'John Doe',
      personal_phone: '00',
      profission: 'Profission',
      residencial_phone: '00',
      rg: 'RG',
      workplace: 'Workplace',
      address_complement: 'Complement'
    });
    const contract = await fakeContractsRepository.create({
      grade_id: 'Grade Example',
      student_id: 'student'
    });
    const agreement = await createAgreement.execute({
      contract_id: contract.id,
      person_id: person.id,
      responsible_type: 'financial'
    });
    expect(agreement).toHaveProperty('id');
  });
  it('should not be able to create a new agreement with a non-existing contract', async () => {
    const person = await fakePersonsRepository.create({
      address_cep: 'CEP',
      address_city: 'City',
      address_neighborhood: 'Neighborhood',
      address_number: '01',
      address_street: 'Street',
      birth_date: new Date(),
      civil_state: 'single',
      commercial_phone: '00',
      cpf: '53318849545',
      education_level: 'elementary_completed',
      email: 'johndoe@example.com',
      income_tax: true,
      monthly_income: 'a_class',
      nacionality: 'Nacionality',
      name: 'John Doe',
      personal_phone: '00',
      profission: 'Profission',
      residencial_phone: '00',
      rg: 'RG',
      workplace: 'Workplace',
      address_complement: 'Complement'
    });
    await expect(createAgreement.execute({
      contract_id: 'non-existing-contract',
      person_id: person.id,
      responsible_type: 'financial'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create a new agreement with a non-existing person', async () => {
    const contract = await fakeContractsRepository.create({
      grade_id: 'Grade Example',
      student_id: 'student'
    });
    await expect(createAgreement.execute({
      person_id: 'non-existing-person',
      contract_id: contract.id,
      responsible_type: 'financial'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});