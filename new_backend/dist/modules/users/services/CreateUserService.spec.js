"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeProfilesRepository = _interopRequireDefault(require("../../profiles/repositories/fakes/FakeProfilesRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeHashProvider;
let fakeUsersRepository;
let fakeProfilesRepository;
let fakeCacheProvider;
let createUser;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    fakeProfilesRepository = new _FakeProfilesRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createUser = new _CreateUserService.default(fakeUsersRepository, fakeProfilesRepository, fakeHashProvider, fakeCacheProvider);
  });
  it('should be able to create a new user by passing username, password and profile id', async () => {
    const profile = await fakeProfilesRepository.create({
      name: 'profile',
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
    const user = await createUser.execute({
      profile_id: profile.id,
      username: 'username',
      password: 'password'
    });
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new user with a profile that does not exists', async () => {
    await expect(createUser.execute({
      profile_id: 'non-existing profile',
      username: 'username',
      password: 'password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create a new user with the same username from another', async () => {
    const profile = await fakeProfilesRepository.create({
      name: 'profile',
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
    const user = await createUser.execute({
      profile_id: profile.id,
      username: 'username',
      password: 'password'
    });
    await expect(createUser.execute({
      profile_id: profile.id,
      username: user.username,
      password: 'password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});