import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to authenticate an user by passing username and password', async () => {
        await fakeUsersRepository.create({
            username: 'user',
            password: '123456',
            profile_id: 'profile',
        });

        const authenticate = await authenticateUser.execute({
            username: 'user',
            password: '123456',
        });

        expect(authenticate).toHaveProperty('user');
        expect(authenticate).toHaveProperty('token');
    });

    it('should not be able to authenticate an user that does not exists', async () => {
        await expect(
            authenticateUser.execute({
                username: 'non-existing-user',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate an user with wrong credentials', async () => {
        await fakeUsersRepository.create({
            username: 'user',
            password: '123456',
            profile_id: 'profile',
        });

        await expect(
            authenticateUser.execute({
                username: 'user',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
