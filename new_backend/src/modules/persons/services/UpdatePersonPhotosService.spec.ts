import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakePersonsRepository from '@modules/persons/repositories/fakes/FakePersonsRepository';
import UpdatePersonPhotosService from './UpdatePersonPhotosService';

let fakePersonsRepository: FakePersonsRepository;
let fakeStorageProvider: FakeStorageProvider;
let updatePersonPhotos: UpdatePersonPhotosService;

describe('UpdatePersonPhotos', () => {
    beforeEach(() => {
        fakePersonsRepository = new FakePersonsRepository();
        fakeStorageProvider = new FakeStorageProvider();

        updatePersonPhotos = new UpdatePersonPhotosService(
            fakePersonsRepository,
            fakeStorageProvider,
        );
    });

    it('should be able to update person photos (rg, cpf and residencial proof) by passing him/her id', async () => {
        const person = await fakePersonsRepository.create({
            address_cep: 'address_cep',
            address_city: 'address_city',
            address_neighborhood: 'address_neighborhood',
            address_number: 'address_number',
            address_street: 'address_street',
            birth_date: new Date(),
            civil_state: 'civil_state',
            commercial_phone: 'commercial_phone',
            cpf: 'cpf',
            education_level: 'education_level',
            email: 'email',
            income_tax: true,
            monthly_income: 1000,
            nacionality: 'nacionality',
            name: 'name',
            personal_phone: 'personal_phone',
            profission: 'profission',
            residencial_phone: 'residencial_phone',
            rg: 'rg',
            workplace: 'workplace',
            address_complement: 'address_complement',
        });

        const updatedPerson = await updatePersonPhotos.execute({
            person_id: person.id,
            rg_photo: 'rg.png',
            cpf_photo: 'cpf.png',
            residencial_proof_photo: 'residencial-proof.png',
        });

        expect(updatedPerson.rg_photo).toBe('rg.png');
        expect(updatedPerson.cpf_photo).toBe('cpf.png');
        expect(updatedPerson.residencial_proof_photo).toBe(
            'residencial-proof.png',
        );
    });

    it('should be able to update person photos and delete the previous photos', async () => {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const person = await fakePersonsRepository.create({
            address_cep: 'address_cep',
            address_city: 'address_city',
            address_neighborhood: 'address_neighborhood',
            address_number: 'address_number',
            address_street: 'address_street',
            birth_date: new Date(),
            civil_state: 'civil_state',
            commercial_phone: 'commercial_phone',
            cpf: 'cpf',
            education_level: 'education_level',
            email: 'email',
            income_tax: true,
            monthly_income: 1000,
            nacionality: 'nacionality',
            name: 'name',
            personal_phone: 'personal_phone',
            profission: 'profission',
            residencial_phone: 'residencial_phone',
            rg: 'rg',
            workplace: 'workplace',
            address_complement: 'address_complement',
        });

        await updatePersonPhotos.execute({
            person_id: person.id,
            rg_photo: 'rg.png',
            cpf_photo: 'cpf.png',
            residencial_proof_photo: 'residencial-proof.png',
        });

        await updatePersonPhotos.execute({
            person_id: person.id,
            rg_photo: 'new-rg.png',
            cpf_photo: 'new-cpf.png',
            residencial_proof_photo: 'new-residencial-proof.png',
        });

        expect(deleteFile).toBeCalledWith('rg.png');
        expect(deleteFile).toBeCalledWith('cpf.png');
        expect(deleteFile).toBeCalledWith('residencial-proof.png');
    });

    it('should not be able to update photos of a non-existing person', async () => {
        await expect(
            updatePersonPhotos.execute({
                person_id: 'non-existing-person',
                rg_photo: 'rg.png',
                cpf_photo: 'cpf.png',
                residencial_proof_photo: 'residencial-proof.png',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
