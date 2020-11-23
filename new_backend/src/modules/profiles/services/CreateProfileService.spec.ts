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

        expect(profile).toHaveProperty('id');
    });

    it('should not be able to create a profile with the same name of another', async () => {
        await createProfile.execute({
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
            validate_enrollments_permiss: false,
        });

        await expect(
            createProfile.execute({
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
                validate_enrollments_permiss: false,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
