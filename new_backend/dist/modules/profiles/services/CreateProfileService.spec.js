"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeProfilesRepository = _interopRequireDefault(require("../repositories/fakes/FakeProfilesRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _CreateProfileService = _interopRequireDefault(require("./CreateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeProfileRepository;
let fakeCacheProvider;
let createProfile;
describe('CreateProfile', () => {
  beforeEach(() => {
    fakeProfileRepository = new _FakeProfilesRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createProfile = new _CreateProfileService.default(fakeProfileRepository, fakeCacheProvider);
  });
  it('should be able to create a profile by passing name and permissions', async () => {
    const profile = await createProfile.execute({
      name: 'Profile Example',
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
    expect(profile).toHaveProperty('id');
  });
  it('should not be able to create a profile with the same name of another', async () => {
    await createProfile.execute({
      name: 'Profile Example',
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
    await expect(createProfile.execute({
      name: 'Profile Example',
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
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});