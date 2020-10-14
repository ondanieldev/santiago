import { Request, Response, Express } from 'express';
import { container } from 'tsyringe';

import UpdateStudentPhotos from '@modules/students/services/UpdateStudentPhotosService';

interface IPhotos {
    birth_certificate_photo?: string;
    vaccine_card_photo?: string;
    health_plan_photo?: string;
    transfer_declaration_photo?: string;
    monthly_declaration_photo?: string;
    school_records_photo?: string;
}

export default class StudentsPhotosController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const files = request.files as Express.Multer.File[];

        const { student_id } = request.params;

        const photos = {} as IPhotos;

        files.forEach((file: Express.Multer.File) => {
            if (
                file.fieldname === 'birth_certificate_photo' ||
                file.fieldname === 'vaccine_card_photo' ||
                file.fieldname === 'health_plan_photo' ||
                file.fieldname === 'transfer_declaration_photo' ||
                file.fieldname === 'monthly_declaration_photo' ||
                file.fieldname === 'school_records_photo'
            ) {
                photos[file.fieldname] = file.filename;
            }
        });

        const updateStudentPhotos = container.resolve(UpdateStudentPhotos);

        const person = await updateStudentPhotos.execute({
            id: student_id,
            birth_certificate_photo: photos.birth_certificate_photo,
            health_plan_photo: photos.health_plan_photo,
            monthly_declaration_photo: photos.monthly_declaration_photo,
            school_records_photo: photos.school_records_photo,
            transfer_declaration_photo: photos.transfer_declaration_photo,
            vaccine_card_photo: photos.vaccine_card_photo,
        });

        return response.json(person);
    }
}
