import FakePersonsRepository from '../repositories/fakes/FakePersonsRepository';
import FindPersonByCpfService from './FindPersonByCpfService';

let fakePersonsRepository: FakePersonsRepository;
let findPersonByCpf: FindPersonByCpfService;

describe('FindPersonByCpfService', () => {
    beforeEach(() => {
        fakePersonsRepository = new FakePersonsRepository();

        findPersonByCpf = new FindPersonByCpfService(fakePersonsRepository);
    });

    it('should be able to get name and id from a specify person by passing him/her cpf', async () => {
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

        const findPerson = await findPersonByCpf.execute('cpf');

        expect(findPerson?.id).toBe(person.id);
    });

    it('should not be able to get name and id of a person from a non-existing-cpf', async () => {
        await fakePersonsRepository.create({
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

        expect(findPersonByCpf.execute('non-existing-cpf')).toBeUndefined();
    });
});
