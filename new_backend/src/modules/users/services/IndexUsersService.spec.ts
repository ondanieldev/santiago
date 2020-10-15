import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import IndexUsersService from './IndexUsersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let indexUsers: IndexUsersService;

describe('IndexUsers', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();

        indexUsers = new IndexUsersService(
            fakeUsersRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list all users', async () => {
        const user = await fakeUsersRepository.create({
            profile_id: 'profile',
            username: 'username',
            password: 'password',
        });

        const anotherUser = await fakeUsersRepository.create({
            profile_id: 'another-profile',
            username: 'another-username',
            password: 'another-password',
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
            password: 'password',
        });

        await fakeUsersRepository.create({
            profile_id: 'another-profile',
            username: 'another-username',
            password: 'another-password',
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
