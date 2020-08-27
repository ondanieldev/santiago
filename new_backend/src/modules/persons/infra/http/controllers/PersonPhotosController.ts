import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdatePersonPhotosService from '@modules/persons/services/UpdatePersonPhotosService';

interface IPhotos {
    rg_photo?: string;
    cpf_photo?: string;
    residencial_proof_photo?: string;
}

export default class PersonPhotosController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const files = request.files as Express.Multer.File[];

        const { person_id } = request.body;

        const photos = {} as IPhotos;

        files.forEach((file: Express.Multer.File) => {
            if (
                file.fieldname === 'rg_photo' ||
                file.fieldname === 'cpf_photo' ||
                file.fieldname === 'residencial_proof_photo'
            ) {
                photos[file.fieldname] = file.filename;
            }
        });

        const updatePersonPhotos = container.resolve(UpdatePersonPhotosService);

        const person = await updatePersonPhotos.execute({
            person_id,
            rg_photo: photos.rg_photo,
            cpf_photo: photos.cpf_photo,
            residencial_proof_photo: photos.residencial_proof_photo,
        });

        return response.json(person);
    }
}
