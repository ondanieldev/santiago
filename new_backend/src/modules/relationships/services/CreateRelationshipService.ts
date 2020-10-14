import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import IPersonsRepository from '@modules/persons/repositories/IPersonsRepository';
import Relationship from '../infra/typeorm/entities/Relationship';
import ICreateRelationshipDTO from '../dtos/ICreateRelationshipDTO';
import IRelationshipsRepository from '../repositories/IRelationshipsRepository';

@injectable()
export default class CreateEnrollmentService {
    constructor(
        @inject('RelationshipsRepository')
        private relationshipsRepository: IRelationshipsRepository,

        @inject('StudentsRepository')
        private studentsRepository: IStudentsRepository,

        @inject('PersonsRepository')
        private personsRepository: IPersonsRepository,
    ) {}

    public async execute({
        student_id,
        person_id,
        kinship,
    }: ICreateRelationshipDTO): Promise<Relationship> {
        const student = await this.studentsRepository.findById(student_id);

        if (!student) {
            throw new AppError(
                'Não é possível criar um relacinamento com um aluno inexistente!',
            );
        }

        const person = await this.personsRepository.findById(person_id);

        if (!person) {
            throw new AppError(
                'Não é possível criar um relacinamento com um responsável inexistente!',
            );
        }

        const relationship = await this.relationshipsRepository.create({
            kinship,
            person_id,
            student_id,
        });

        return relationship;
    }
}
