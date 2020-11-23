"use strict";

var _FakePersonsRepository = _interopRequireDefault(require("../repositories/fakes/FakePersonsRepository"));

var _FindPersonByCpfService = _interopRequireDefault(require("./FindPersonByCpfService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakePersonsRepository;
let findPersonByCpf;
describe('FindPersonByCpfService', () => {
  beforeEach(() => {
    fakePersonsRepository = new _FakePersonsRepository.default();
    findPersonByCpf = new _FindPersonByCpfService.default(fakePersonsRepository);
  });
  it('should be able to get name and id from a specify person by passing him/her cpf', async () => {
    const person = await fakePersonsRepository.create({
      address_cep: 'address_cep',
      address_city: 'address_city',
      address_neighborhood: 'address_neighborhood',
      address_number: 'address_number',
      address_street: 'address_street',
      birth_date: new Date(),
      civil_state: 'single',
      commercial_phone: 'commercial_phone',
      cpf: '27328613084',
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
    const findPerson = await findPersonByCpf.execute('27328613084');
    expect(findPerson?.id).toBe(person.id);
  });
  it('should not be able to get name and id of a person from a non-existing-cpf', async () => {
    await fakePersonsRepository.create({
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
    const find = await findPersonByCpf.execute('27328613084');
    expect(find).toBeUndefined();
  });
});