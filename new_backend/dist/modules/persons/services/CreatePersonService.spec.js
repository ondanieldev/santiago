"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakePersonsRepository = _interopRequireDefault(require("../repositories/fakes/FakePersonsRepository"));

var _CreatePersonService = _interopRequireDefault(require("./CreatePersonService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakePersonsRepository;
let createPerson;
describe('CreatePerson', () => {
  beforeEach(() => {
    fakePersonsRepository = new _FakePersonsRepository.default();
    createPerson = new _CreatePersonService.default(fakePersonsRepository);
  });
  it('should be able to create a new person', async () => {
    const person = await createPerson.execute({
      address_cep: '12345678',
      address_city: 'City',
      address_neighborhood: 'Neighborhood',
      address_number: '01',
      address_street: 'Street',
      birth_date: new Date(),
      civil_state: 'single',
      commercial_phone: '00',
      cpf: '18570219083',
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
    expect(person).toHaveProperty('id');
  });
  it('should not be able to create a new person with a non-valid CPF', async () => {
    await expect(createPerson.execute({
      cpf: 'non-valid-cpf',
      address_cep: '12345678',
      address_city: 'City',
      address_neighborhood: 'Neighborhood',
      address_number: '01',
      address_street: 'Street',
      birth_date: new Date(),
      civil_state: 'single',
      commercial_phone: '00',
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
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create a new person with the same CPF, RG or e-mail from another', async () => {
    await createPerson.execute({
      rg: 'RG',
      cpf: '18570219083',
      email: 'johndoe@example.com',
      address_cep: '12345678',
      address_city: 'City',
      address_neighborhood: 'Neighborhood',
      address_number: '01',
      address_street: 'Street',
      birth_date: new Date(),
      civil_state: 'single',
      commercial_phone: '00',
      education_level: 'elementary_completed',
      income_tax: true,
      monthly_income: 'a_class',
      nacionality: 'Nacionality',
      name: 'John Doe',
      personal_phone: '00',
      profission: 'Profission',
      residencial_phone: '00',
      workplace: 'Workplace',
      address_complement: 'Complement'
    });
    await expect(createPerson.execute({
      rg: 'RG',
      cpf: '18570219083',
      email: 'johndoe@example.com',
      address_cep: '12345678',
      address_city: 'City',
      address_neighborhood: 'Neighborhood',
      address_number: '01',
      address_street: 'Street',
      birth_date: new Date(),
      civil_state: 'single',
      commercial_phone: '00',
      education_level: 'elementary_completed',
      income_tax: true,
      monthly_income: 'a_class',
      nacionality: 'Nacionality',
      name: 'John Doe',
      personal_phone: '00',
      profission: 'Profission',
      residencial_phone: '00',
      workplace: 'Workplace',
      address_complement: 'Complement'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});