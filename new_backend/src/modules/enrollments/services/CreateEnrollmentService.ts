import { container, injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPersonsRepository from '@modules/persons/repositories/IPersonsRepository';
import ICreateEnrollmentDTO from '@modules/enrollments/dtos/ICreateEnrollmentDTO';
import CheckResponsiblesTypesService from '@modules/enrollments/services/CheckResponsiblesTypesService';
import CheckResponsiblesUniqueValuesService from '@modules/enrollments/services/CheckResponsiblesUniqueValuesService';
import CreateStudentService from '@modules/students/services/CreateStudentService';
import CreateContractService from '@modules/contracts/services/CreateContractService';
import CreatePersonService from '@modules/persons/services/CreatePersonService';
import CreateRelationshipService from '@modules/relationships/services/CreateRelationshipService';
import CreateAgreementService from '@modules/agreements/services/CreateAgreementService';
import FindGradeByIdService from '@modules/grades/services/FindGradeByIdService';
import Person from '@modules/persons/infra/typeorm/entities/Person';

interface IResponse {
    student_id: string;
    responsibles_ids: string[];
}

@injectable()
export default class CreateEnrollmentService {
    constructor(
        @inject('PersonsRepository')
        private personsRepository: IPersonsRepository,
    ) {}

    public async execute({
        student,
        grade_id,
        responsibles,
    }: ICreateEnrollmentDTO): Promise<IResponse> {
        const findGradeById = container.resolve(FindGradeByIdService);
        const grade = await findGradeById.execute(grade_id);

        if (!grade) {
            throw new AppError('This grade dos not exists');
        }

        const checkResponsiblesTypes = new CheckResponsiblesTypesService();
        checkResponsiblesTypes.execute(responsibles);

        const checkResponsiblesUniqueValues = new CheckResponsiblesUniqueValuesService();
        checkResponsiblesUniqueValues.execute(responsibles);

        const createStudent = container.resolve(CreateStudentService);
        const createdStudent = await createStudent.execute(student);

        const createContract = container.resolve(CreateContractService);
        const createdContract = await createContract.execute({
            grade_id,
            status: 'underAnalysis',
            student_id: createdStudent.id,
        });

        const createPerson = container.resolve(CreatePersonService);

        const createRelationship = container.resolve(CreateRelationshipService);

        const createAgreement = container.resolve(CreateAgreementService);

        const createdResponsiblesIds = [];

        for (const responsible of responsibles) {
            const { kinship, responsible_type } = responsible;
            delete responsible.kinship;
            delete responsible.responsible_type;

            let createdResponsible = {} as Person;

            if (responsible.id) {
                const personExists = await this.personsRepository.findById(
                    responsible.id,
                );

                if (personExists) {
                    createdResponsible = personExists;
                    createdResponsiblesIds.push(responsible.id);
                }
            } else {
                createdResponsible = await createPerson.execute(responsible);
                createdResponsiblesIds.push(createdResponsible.id);
            }

            await createRelationship.execute({
                kinship,
                person_id: createdResponsible.id,
                student_id: createdStudent.id,
            });

            await createAgreement.execute({
                responsible_type,
                contract_id: createdContract.id,
                person_id: createdResponsible.id,
            });
        }

        return {
            student_id: createdStudent.id,
            responsibles_ids: createdResponsiblesIds,
        };
    }
}
