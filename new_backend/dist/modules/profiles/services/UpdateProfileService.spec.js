"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeProfilesRepository = _interopRequireDefault(require("../repositories/fakes/FakeProfilesRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeProfileRepository;
let fakeCacheProvider;
let updateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeProfileRepository = new _FakeProfilesRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    updateProfile = new _UpdateProfileService.default(fakeProfileRepository, fakeCacheProvider);
  });
  it('should be able to update all profile data', async () => {
    const profile = await fakeProfileRepository.create({
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
    const updatedProfile = await updateProfile.execute({
      id: profile.id,
      name: 'Updated Profile Example',
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
    expect(updatedProfile.id).toBe(profile.id);
    expect(updatedProfile.name).toBe(updatedProfile.name);
  });
  it('should not be able to update a profile that does not exists', async () => {
    await expect(updateProfile.execute({
      id: 'non-existing-profile',
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
  it('should not be able to update a profile with the same name of another', async () => {
    const profile = await fakeProfileRepository.create({
      name: 'Profile Example',
      create_extra_debits_permiss: true,
      create_new_enrollments_permiss: true,
      crud_extra_debits_permiss: true,
      crud_grades_permiss: true,
      crud_profiles_permiss: true,
      crud_users_permiss: true,
      discharge_payments_permiss: true,
      generate_documents_permiss: true,
      pay_debits_permiss: true,
      validate_enrollments_permiss: true
    });
    const anotherProfile = await fakeProfileRepository.create({
      name: 'Another Profile Example',
      create_extra_debits_permiss: true,
      create_new_enrollments_permiss: true,
      crud_extra_debits_permiss: true,
      crud_grades_permiss: true,
      crud_profiles_permiss: true,
      crud_users_permiss: true,
      discharge_payments_permiss: true,
      generate_documents_permiss: true,
      pay_debits_permiss: true,
      validate_enrollments_permiss: true
    });
    await expect(updateProfile.execute({
      id: profile.id,
      name: anotherProfile.name,
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