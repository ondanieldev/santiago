import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IPersonsRepository from '@modules/persons/repositories/IPersonsRepository';
import Person from '@modules/persons/infra/typeorm/entities/Person';

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
        private ormRepository: IPersonsRepository,
    ) {}

    public async execute({
        person_id,
        rg_photo,
        cpf_photo,
        residencial_proof_photo,
    }: IRequest): Promise<Person> {
        const person = await this.ormRepository.findById(person_id);

        if (!person) {
            throw new AppError('Person not found!');
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
            if (person[photo.field]) {
                const filePath = path.join(
                    uploadConfig.directory,
                    person[photo.field],
                );

                try {
                    const fileExists = await fs.promises.stat(filePath);

                    if (fileExists) {
                        await fs.promises.unlink(filePath);
                    }
                } catch {}
            }

            person[photo.field] = photo.filename;
        }

        await this.ormRepository.save(person);

        return person;
    }
}
