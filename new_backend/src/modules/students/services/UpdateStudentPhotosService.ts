import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import Student from '@modules/students/infra/typeorm/entities/Student';

interface IRequest {
    id: string;
    birth_certificate_photo?: string;
    vaccine_card_photo?: string;
    health_plan_photo?: string;
    transfer_declaration_photo?: string;
    monthly_declaration_photo?: string;
    school_records_photo?: string;
}

interface IPhoto {
    field:
        | 'birth_certificate_photo'
        | 'vaccine_card_photo'
        | 'health_plan_photo'
        | 'transfer_declaration_photo'
        | 'monthly_declaration_photo'
        | 'school_records_photo';
    filename: string;
}

@injectable()
export default class UpdateStudentPhotosService {
    constructor(
        @inject('StudentsRepository')
        private ormRepository: IStudentsRepository,
    ) {}

    public async execute({
        id,
        birth_certificate_photo,
        health_plan_photo,
        monthly_declaration_photo,
        school_records_photo,
        transfer_declaration_photo,
        vaccine_card_photo,
    }: IRequest): Promise<Student> {
        const student = await this.ormRepository.findById(id);

        if (!student) {
            throw new AppError('Student not found!');
        }

        const photos = [] as IPhoto[];

        if (birth_certificate_photo)
            photos.push({
                field: 'birth_certificate_photo',
                filename: birth_certificate_photo,
            });

        if (health_plan_photo)
            photos.push({
                field: 'health_plan_photo',
                filename: health_plan_photo,
            });

        if (monthly_declaration_photo)
            photos.push({
                field: 'monthly_declaration_photo',
                filename: monthly_declaration_photo,
            });

        if (school_records_photo)
            photos.push({
                field: 'school_records_photo',
                filename: school_records_photo,
            });

        if (transfer_declaration_photo)
            photos.push({
                field: 'transfer_declaration_photo',
                filename: transfer_declaration_photo,
            });

        if (vaccine_card_photo)
            photos.push({
                field: 'vaccine_card_photo',
                filename: vaccine_card_photo,
            });

        for (const photo of photos) {
            if (student[photo.field]) {
                const filePath = path.join(
                    uploadConfig.directory,
                    student[photo.field],
                );

                try {
                    const fileExists = await fs.promises.stat(filePath);

                    if (fileExists) {
                        await fs.promises.unlink(filePath);
                    }
                } catch {}
            }

            student[photo.field] = `http://localhost:3333/${photo.filename}`;
        }

        await this.ormRepository.save(student);

        return student;
    }
}
