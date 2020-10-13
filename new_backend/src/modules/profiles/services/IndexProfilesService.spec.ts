import FakeProfileRepository from '@modules/profiles/repositories/fakes/FakeProfilesRepository';
import IndexProfilesService from './IndexProfilesService';

let fakeProfileRepository: FakeProfileRepository;
let indexProfiles: IndexProfilesService;

describe('IndexProfiles', () => {
    beforeEach(() => {
        fakeProfileRepository = new FakeProfileRepository();

        indexProfiles = new IndexProfilesService(fakeProfileRepository);
    });

    it('should be able to list all profiles', async () => {
        const profile = await fakeProfileRepository.create({
            name: 'Profile Example',
            crud_grades_permiss: true,
            crud_profiles_permiss: true,
            crud_users_permiss: true,
            discharge_payment_permiss: true,
            new_enrollment_permiss: true,
            pay_debit_permiss: true,
            validate_enrollment_permiss: true,
        });

        const anotherProfile = await fakeProfileRepository.create({
            name: 'Another Profile Example',
            crud_grades_permiss: true,
            crud_profiles_permiss: true,
            crud_users_permiss: true,
            discharge_payment_permiss: true,
            new_enrollment_permiss: true,
            pay_debit_permiss: true,
            validate_enrollment_permiss: true,
        });

        const profiles = await indexProfiles.execute();

        expect(profiles[0].id).toBe(profile.id);
        expect(profiles[1].id).toBe(anotherProfile.id);
    });

    it('should not be able to list profiles that does not exists', async () => {
        const profiles = await indexProfiles.execute();

        expect(profiles).toStrictEqual([]);
    });
});
