import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Person from '@modules/persons/infra/typeorm/entities/Person';
import IPersonsRepository from '@modules/persons/repositories/IPersonsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
    person_id: string;
    rg_photo?: string;
    cpf_photo?: string;
    residencial_proof_photo?: string;
}

interface IPhoto {
    field: 'rg_photo' | 'cpf_photo' | 'residencial_proof_photo';
    filename: string;
}

@injectable()
export default class UpdatePersonPhotosService {
    constructor(
        @inject('PersonsRepository')
        private personsRepository: IPersonsRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({
        person_id,
        rg_photo,
        cpf_photo,
        residencial_proof_photo,
    }: IRequest): Promise<Person> {
        const person = await this.personsRepository.findById(person_id);

        if (!person) {
            throw new AppError(
                'não é possível atualizar as fotos de uma pessoa inexistente!',
            );
        }

        const photos = [] as IPhoto[];

        if (rg_photo) photos.push({ field: 'rg_photo', filename: rg_photo });
        if (cpf_photo) photos.push({ field: 'cpf_photo', filename: cpf_photo });
        if (residencial_proof_photo)
            photos.push({
                field: 'residencial_proof_photo',
                filename: residencial_proof_photo,
            });

        for (const photo of photos) {
            await this.storageProvider.saveFile(photo.filename);

            if (person[photo.field]) {
                await this.storageProvider.deleteFile(person[photo.field]);
            }

            person[photo.field] = photo.filename;
        }

        await this.personsRepository.save(person);

        return person;
    }
}
