import AppError from '@shared/errors/AppError';
import FakeProfileRepository from '@modules/profiles/repositories/fakes/FakeProfilesRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeProfileRepository: FakeProfileRepository;
let fakeCacheProvider: FakeCacheProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeProfileRepository = new FakeProfileRepository();
        fakeCacheProvider = new FakeCacheProvider();

        updateProfile = new UpdateProfileService(
            fakeProfileRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to update all profile data', async () => {
        const profile = await fakeProfileRepository.create({
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

        const updatedProfile = await updateProfile.execute({
            id: profile.id,
            name: 'Updated Profile Example',
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

        expect(updatedProfile.id).toBe(profile.id);
        expect(updatedProfile.name).toBe(updatedProfile.name);
    });

    it('should not be able to update a profile that does not exists', async () => {
        await expect(
            updateProfile.execute({
                id: 'non-existing-profile',
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

    it('should not be able to update a profile with the same name of another', async () => {
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
            validate_enrollments_permiss: true,
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
            validate_enrollments_permiss: true,
        });

        await expect(
            updateProfile.execute({
                id: profile.id,
                name: anotherProfile.name,
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
