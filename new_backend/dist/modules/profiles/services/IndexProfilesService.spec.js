"use strict";

var _FakeProfilesRepository = _interopRequireDefault(require("../repositories/fakes/FakeProfilesRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _IndexProfilesService = _interopRequireDefault(require("./IndexProfilesService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeProfileRepository;
let fakeCacheProvider;
let indexProfiles;
describe('IndexProfiles', () => {
  beforeEach(() => {
    fakeProfileRepository = new _FakeProfilesRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    indexProfiles = new _IndexProfilesService.default(fakeProfileRepository, fakeCacheProvider);
  });
  it('should be able to list all profiles', async () => {
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
    const profiles = await indexProfiles.execute();
    expect(profiles[0].id).toBe(profile.id);
    expect(profiles[1].id).toBe(anotherProfile.id);
  });
  it('should be able to list all cached profiles', async () => {
    const registerCache = jest.spyOn(fakeCacheProvider, 'register');
    await fakeProfileRepository.create({
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
    await indexProfiles.execute();
    await indexProfiles.execute();
    expect(registerCache).toBeCalledTimes(1);
  });
  it('should not be able to list profiles that does not exists', async () => {
    const profiles = await indexProfiles.execute();
    expect(profiles).toStrictEqual([]);
  });
});