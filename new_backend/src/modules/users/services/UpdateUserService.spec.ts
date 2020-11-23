import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeProfilesRepository from '@modules/profiles/repositories/fakes/FakeProfilesRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import UpdateUserService from './UpdateUserService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeProfilesRepository: FakeProfilesRepository;
let fakeCacheProvider: FakeCacheProvider;
let updateUser: UpdateUserService;

describe('UpdateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeProfilesRepository = new FakeProfilesRepository();
        fakeCacheProvider = new FakeCacheProvider();

        updateUser = new UpdateUserService(
            fakeUsersRepository,
            fakeProfilesRepository,
            fakeHashProvider,
            fakeCacheProvider,
        );
    });

    it('should be able to update a user by passing username, password and profile id', async () => {
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
            validate_enrollments_permiss: true,
        });

        const anotherProfile = await fakeProfilesRepository.create({
            name: 'another-profile',
            create_extra_debits_permiss: false,
            create_new_enrollments_permiss: false,
            crud_extra_debits_permiss: false,
            crud_grades_permiss: false,
            crud_profiles_permiss: false,
            crud_users_permiss: false,
            discharge_payments_permiss: false,
            generate_documents_permiss: false,
            pay_debits_permiss: false,
            validate_enrollments_permiss: false,
        });

        const user = await fakeUsersRepository.create({
            profile_id: profile.id,
            username: 'username',
            password: 'password',
        });

        const updatedUser = await updateUser.execute({
            id: user.id,
            profile_id: anotherProfile.id,
            username: 'update-username',
            password: 'update-password',
        });

        expect(updatedUser.id).toBe(user.id);
        expect(updatedUser.profile_id).toBe(anotherProfile.id);
        expect(updatedUser.username).toBe('update-username');
        expect(updatedUser.password).toBe('update-password');
    });

    it('should not be able to update a user that does not exists', async () => {
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
            validate_enrollments_permiss: true,
        });

        await expect(
            updateUser.execute({
                id: 'non-existing-user',
                profile_id: profile.id,
                username: 'username',
                password: 'password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update a user with a profile that does not exists', async () => {
        const user = await fakeUsersRepository.create({
            profile_id: 'profile',
            username: 'username',
            password: 'password',
        });

        await expect(
            updateUser.execute({
                id: user.id,
                profile_id: 'non-existing-profile',
                username: 'username',
                password: 'password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update a user with the same username from another', async () => {
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
            validate_enrollments_permiss: true,
        });

        await fakeUsersRepository.create({
            username: 'John Doe',
            password: '123456',
            profile_id: profile.id,
        });

        const userWillBeUpdated = await fakeUsersRepository.create({
            username: 'John Tre',
            password: '123456',
            profile_id: profile.id,
        });

        await expect(
            updateUser.execute({
                id: userWillBeUpdated.id,
                profile_id: profile.id,
                username: 'John Doe',
                password: 'password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
