import FakePersonsRepository from '@modules/persons/repositories/fakes/FakePersonsRepository';
import UpdatePersonPhotosService from './UpdatePersonPhotosService';

let updatePersonPhotos: UpdatePersonPhotosService;
let fakePersonsRepository: FakePersonsRepository;

describe('UpdatePersonPhotos', () => {
    beforeEach(() => {
        fakePersonsRepository = new FakePersonsRepository();

        updatePersonPhotos = new UpdatePersonPhotosService(
            fakePersonsRepository,
        );
    });
});
