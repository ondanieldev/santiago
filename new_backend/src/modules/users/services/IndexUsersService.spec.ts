import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import IndexUsersService from './IndexUsersService';

let fakeUsersRepository: FakeUsersRepository;
let indexUsers: IndexUsersService;

describe('IndexUsers', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        indexUsers = new IndexUsersService(fakeUsersRepository);
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

    it('should not be able to list users that does not exists', async () => {
        const users = await indexUsers.execute();

        expect(users).toStrictEqual([]);
    });
});
