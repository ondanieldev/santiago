"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../../../shared/container/providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeHashProvider;
let fakeUsersRepository;
let authenticateUser;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    authenticateUser = new _AuthenticateUserService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to authenticate an user by passing username and password', async () => {
    await fakeUsersRepository.create({
      username: 'user',
      password: '123456',
      profile_id: 'profile'
    });
    const authenticate = await authenticateUser.execute({
      username: 'user',
      password: '123456'
    });
    expect(authenticate).toHaveProperty('user');
    expect(authenticate).toHaveProperty('token');
  });
  it('should not be able to authenticate an user that does not exists', async () => {
    await expect(authenticateUser.execute({
      username: 'non-existing-user',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to authenticate an user with wrong credentials', async () => {
    await fakeUsersRepository.create({
      username: 'user',
      password: '123456',
      profile_id: 'profile'
    });
    await expect(authenticateUser.execute({
      username: 'user',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});