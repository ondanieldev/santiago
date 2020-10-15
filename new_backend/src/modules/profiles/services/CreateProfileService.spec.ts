import AppError from '@shared/errors/AppError';
import FakeProfileRepository from '@modules/profiles/repositories/fakes/FakeProfilesRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateProfileService from './CreateProfileService';

let fakeProfileRepository: FakeProfileRepository;
let fakeCacheProvider: FakeCacheProvider;
let createProfile: CreateProfileService;

describe('CreateProfile', () => {
    beforeEach(() => {
        fakeProfileRepository = new FakeProfileRepository();
        fakeCacheProvider = new FakeCacheProvider();

        createProfile = new CreateProfileService(
            fakeProfileRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to create a profile by passing name and permissions', async () => {
        const profile = await createProfile.execute({
            name: 'Profile Example',
            crud_grades_permiss: true,
            crud_profiles_permiss: true,
            crud_users_permiss: true,
            discharge_payment_permiss: true,
            new_enrollment_permiss: true,
            pay_debit_permiss: true,
            validate_enrollment_permiss: true,
        });

        expect(profile).toHaveProperty('id');
    });

    it('should not be able to create a profile with the same name of another', async () => {
        await createProfile.execute({
            name: 'Profile Example',
            crud_grades_permiss: true,
            crud_profiles_permiss: true,
            crud_users_permiss: true,
            discharge_payment_permiss: true,
            new_enrollment_permiss: true,
            pay_debit_permiss: true,
            validate_enrollment_permiss: true,
        });

        await expect(
            createProfile.execute({
                name: 'Profile Example',
                crud_grades_permiss: false,
                crud_profiles_permiss: false,
                crud_users_permiss: false,
                discharge_payment_permiss: false,
                new_enrollment_permiss: false,
                pay_debit_permiss: false,
                validate_enrollment_permiss: false,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
