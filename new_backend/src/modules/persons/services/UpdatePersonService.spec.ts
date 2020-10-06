import AppError from '@shared/errors/AppError';

import FakePersonsRepository from '@modules/persons/repositories/fakes/FakePersonsRepository';
import Person from '@modules/persons/infra/typeorm/entities/Person';
import UpdatePersonService from './UpdatePersonService';

let fakePersonsRepository: FakePersonsRepository;
let updatePerson: UpdatePersonService;

describe('UpdateStudent', () => {
    beforeEach(() => {
        fakePersonsRepository = new FakePersonsRepository();

        updatePerson = new UpdatePersonService(fakePersonsRepository);
    });

    it('should be able to update all data of a person', async () => {
        const createdPerson = await fakePersonsRepository.create({
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

        const updatePersonData = {
            address_cep: 'address_cep_updated',
            address_city: 'address_city_updated',
            address_neighborhood: 'address_neighborhood_updated',
            address_number: 'address_number_updated',
            address_street: 'address_street_updated',
            birth_date: new Date(),
            civil_state: 'civil_state_updated',
            commercial_phone: 'commercial_phone_updated',
            cpf: 'cpf_updated',
            education_level: 'education_level_updated',
            email: 'email_updated',
            income_tax: true,
            monthly_income: 1000,
            nacionality: 'nacionality_updated',
            name: 'name_updated',
            personal_phone: 'personal_phone_updated',
            profission: 'profission_updated',
            residencial_phone: 'residencial_phone_updated',
            rg: 'rg_updated',
            workplace: 'workplace_updated',
            address_complement: 'address_complement_updated',
        };

        const updatedPerson = await updatePerson.execute({
            id: createdPerson.id,
            ...updatePersonData,
        } as Person);

        expect(updatedPerson.id).toBe(createdPerson.id);
        expect(updatedPerson.name).toBe('name_updated');
    });

    it('should not be able to update data of a non-existing person', async () => {
        const updatePersonData = {
            address_cep: 'address_cep_updated',
            address_city: 'address_city_updated',
            address_neighborhood: 'address_neighborhood_updated',
            address_number: 'address_number_updated',
            address_street: 'address_street_updated',
            birth_date: new Date(),
            civil_state: 'civil_state_updated',
            commercial_phone: 'commercial_phone_updated',
            cpf: 'cpf_updated',
            education_level: 'education_level_updated',
            email: 'email_updated',
            income_tax: true,
            monthly_income: 1000,
            nacionality: 'nacionality_updated',
            name: 'name_updated',
            personal_phone: 'personal_phone_updated',
            profission: 'profission_updated',
            residencial_phone: 'residencial_phone_updated',
            rg: 'rg_updated',
            workplace: 'workplace_updated',
            address_complement: 'address_complement_updated',
        };

        await expect(
            updatePerson.execute({
                id: 'non-existing-person',
                ...updatePersonData,
            } as Person),
        ).rejects.toBeInstanceOf(AppError);
    });
});
