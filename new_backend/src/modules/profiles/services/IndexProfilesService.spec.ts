import FakeProfileRepository from '@modules/profiles/repositories/fakes/FakeProfilesRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import IndexProfilesService from './IndexProfilesService';

let fakeProfileRepository: FakeProfileRepository;
let fakeCacheProvider: FakeCacheProvider;
let indexProfiles: IndexProfilesService;

describe('IndexProfiles', () => {
    beforeEach(() => {
        fakeProfileRepository = new FakeProfileRepository();
        fakeCacheProvider = new FakeCacheProvider();

        indexProfiles = new IndexProfilesService(
            fakeProfileRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list all profiles', async () => {
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

        const profiles = await indexProfiles.execute();

        expect(profiles[0].id).toBe(profile.id);
        expect(profiles[1].id).toBe(anotherProfile.id);
    });

    it('should be able to list all cached profiles', async () => {
        const registerCache = jest.spyOn(fakeCacheProvider, 'register');

        await fakeProfileRepository.create({
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

        await indexProfiles.execute();

        await indexProfiles.execute();

        expect(registerCache).toBeCalledTimes(1);
    });

    it('should not be able to list profiles that does not exists', async () => {
        const profiles = await indexProfiles.execute();

        expect(profiles).toStrictEqual([]);
    });
});
