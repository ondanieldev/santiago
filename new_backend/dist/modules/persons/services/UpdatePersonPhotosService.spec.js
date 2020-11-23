"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _FakePersonsRepository = _interopRequireDefault(require("../repositories/fakes/FakePersonsRepository"));

var _UpdatePersonPhotosService = _interopRequireDefault(require("./UpdatePersonPhotosService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakePersonsRepository;
let fakeStorageProvider;
let updatePersonPhotos;
describe('UpdatePersonPhotos', () => {
  beforeEach(() => {
    fakePersonsRepository = new _FakePersonsRepository.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    updatePersonPhotos = new _UpdatePersonPhotosService.default(fakePersonsRepository, fakeStorageProvider);
  });
  it('should be able to update person photos (rg, cpf and residencial proof) by passing him/her id', async () => {
    const person = await fakePersonsRepository.create({
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
    const updatedPerson = await updatePersonPhotos.execute({
      person_id: person.id,
      rg_photo: 'rg.png',
      cpf_photo: 'cpf.png',
      residencial_proof_photo: 'residencial-proof.png'
    });
    expect(updatedPerson.rg_photo).toBe('rg.png');
    expect(updatedPerson.cpf_photo).toBe('cpf.png');
    expect(updatedPerson.residencial_proof_photo).toBe('residencial-proof.png');
  });
  it('should not be able to update person photos when any photo had been passed', async () => {
    const person = await fakePersonsRepository.create({
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
    const updatedPerson = await updatePersonPhotos.execute({
      person_id: person.id
    });
    expect(updatedPerson.rg_photo).toBeUndefined();
    expect(updatedPerson.cpf_photo).toBeUndefined();
    expect(updatedPerson.residencial_proof_photo).toBeUndefined();
  });
  it('should be able to update person photos and delete the previous photos', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const person = await fakePersonsRepository.create({
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
    await updatePersonPhotos.execute({
      person_id: person.id,
      rg_photo: 'rg.png',
      cpf_photo: 'cpf.png',
      residencial_proof_photo: 'residencial-proof.png'
    });
    await updatePersonPhotos.execute({
      person_id: person.id,
      rg_photo: 'new-rg.png',
      cpf_photo: 'new-cpf.png',
      residencial_proof_photo: 'new-residencial-proof.png'
    });
    expect(deleteFile).toBeCalledWith('rg.png');
    expect(deleteFile).toBeCalledWith('cpf.png');
    expect(deleteFile).toBeCalledWith('residencial-proof.png');
  });
  it('should not be able to update photos of a non-existing person', async () => {
    await expect(updatePersonPhotos.execute({
      person_id: 'non-existing-person',
      rg_photo: 'rg.png',
      cpf_photo: 'cpf.png',
      residencial_proof_photo: 'residencial-proof.png'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});