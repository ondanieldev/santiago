"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakePersonsRepository = _interopRequireDefault(require("../repositories/fakes/FakePersonsRepository"));

var _UpdatePersonService = _interopRequireDefault(require("./UpdatePersonService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakePersonsRepository;
let updatePerson;
describe('UpdatePerson', () => {
  beforeEach(() => {
    fakePersonsRepository = new _FakePersonsRepository.default();
    updatePerson = new _UpdatePersonService.default(fakePersonsRepository);
  });
  it('should be able to update all data of a person', async () => {
    const createdPerson = await fakePersonsRepository.create({
      address_cep: 'address_cep',
      address_city: 'address_city',
      address_neighborhood: 'address_neighborhood',
      address_number: 'address_number',
      address_street: 'address_street',
      birth_date: new Date(),
      civil_state: 'single',
      commercial_phone: 'commercial_phone',
      cpf: 'cpf',
      education_level: 'elementary_completed',
      email: 'email',
      income_tax: true,
      monthly_income: 'a_class',
      nacionality: 'nacionality',
      name: 'name',
      personal_phone: 'personal_phone',
      profission: 'profission',
      residencial_phone: 'residencial_phone',
      rg: 'rg',
      workplace: 'workplace',
      address_complement: 'address_complement'
    });
    const updatePersonData = {
      address_cep: 'address_cep_updated',
      address_city: 'address_city_updated',
      address_neighborhood: 'address_neighborhood_updated',
      address_number: 'address_number_updated',
      address_street: 'address_street_updated',
      birth_date: new Date(),
      civil_state: 'single',
      commercial_phone: 'commercial_phone_updated',
      cpf: 'cpf_updated',
      education_level: 'education_level_updated',
      email: 'email_updated',
      income_tax: true,
      monthly_income: 'a_class',
      nacionality: 'nacionality_updated',
      name: 'name_updated',
      personal_phone: 'personal_phone_updated',
      profission: 'profission_updated',
      residencial_phone: 'residencial_phone_updated',
      rg: 'rg_updated',
      workplace: 'workplace_updated',
      address_complement: 'address_complement_updated'
    };
    await updatePerson.execute({
      id: createdPerson.id,
      ...updatePersonData
    });
    const person = await fakePersonsRepository.findById(createdPerson.id);
    expect(person?.id).toBe(createdPerson.id);
    expect(person?.name).toBe('name_updated');
  });
  it('should not be able to update data of a non-existing person', async () => {
    const updatePersonData = {
      address_cep: 'address_cep_updated',
      address_city: 'address_city_updated',
      address_neighborhood: 'address_neighborhood_updated',
      address_number: 'address_number_updated',
      address_street: 'address_street_updated',
      birth_date: new Date(),
      civil_state: 'single',
      commercial_phone: 'commercial_phone_updated',
      cpf: 'cpf_updated',
      education_level: 'education_level_updated',
      email: 'email_updated',
      income_tax: true,
      monthly_income: 'a_class',
      nacionality: 'nacionality_updated',
      name: 'name_updated',
      personal_phone: 'personal_phone_updated',
      profission: 'profission_updated',
      residencial_phone: 'residencial_phone_updated',
      rg: 'rg_updated',
      workplace: 'workplace_updated',
      address_complement: 'address_complement_updated'
    };
    await expect(updatePerson.execute({
      id: 'non-existing-person',
      ...updatePersonData
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});