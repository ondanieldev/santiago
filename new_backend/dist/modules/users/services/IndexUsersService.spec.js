"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _IndexUsersService = _interopRequireDefault(require("./IndexUsersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeCacheProvider;
let indexUsers;
describe('IndexUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    indexUsers = new _IndexUsersService.default(fakeUsersRepository, fakeCacheProvider);
  });
  it('should be able to list all users', async () => {
    const user = await fakeUsersRepository.create({
      profile_id: 'profile',
      username: 'username',
      password: 'password'
    });
    const anotherUser = await fakeUsersRepository.create({
      profile_id: 'another-profile',
      username: 'another-username',
      password: 'another-password'
    });
    const users = await indexUsers.execute();
    expect(users[0].id).toBe(user.id);
    expect(users[1].id).toBe(anotherUser.id);
  });
  it('should be able to list all cashed users', async () => {
    const registerCache = jest.spyOn(fakeCacheProvider, 'register');
    await fakeUsersRepository.create({
      profile_id: 'profile',
      username: 'username',
      password: 'password'
    });
    await fakeUsersRepository.create({
      profile_id: 'another-profile',
      username: 'another-username',
      password: 'another-password'
    });
    await indexUsers.execute();
    await indexUsers.execute();
    expect(registerCache).toBeCalledTimes(1);
  });
  it('should not be able to list users that does not exists', async () => {
    const users = await indexUsers.execute();
    expect(users).toStrictEqual([]);
  });
});