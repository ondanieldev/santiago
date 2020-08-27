import { container } from 'tsyringe';
import { addMonths } from 'date-fns';

import AppError from '@shared/errors/AppError';
import ICreateEnrollmentDTO from '@modules/enrollments/dtos/ICreateEnrollmentDTO';
import CheckResponsiblesTypesService from '@modules/enrollments/services/CheckResponsiblesTypesService';
import CheckResponsiblesUniqueValuesService from '@modules/enrollments/services/CheckResponsiblesUniqueValuesService';
import CreateStudentService from '@modules/students/services/CreateStudentService';
import CreateContractService from '@modules/contracts/services/CreateContractService';
import CreatePersonService from '@modules/persons/services/CreatePersonService';
import CreateRelationshipService from '@modules/relationships/services/CreateRelationshipService';
import CreateAgreementService from '@modules/agreements/services/CreateAgreementService';
import FindGradeByIdService from '@modules/grades/services/FindGradeByIdService';
import CreateDebitService from '@modules/debits/services/CreateDebitService';

interface IResponse {
    student_id: string;
    responsibles_ids: string[];
}

export default class CreateEnrollmentService {
    public async execute({
        student,
        grade_id,
        responsibles,
    }: ICreateEnrollmentDTO): Promise<IResponse> {
        const findGradeById = container.resolve(FindGradeByIdService);
        const grade = await findGradeById.execute(grade_id);

        if (!grade) {
            throw new AppError('Yhis grade dos not exists');
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

            const createdResponsible = await createPerson.execute(responsible);
            createdResponsiblesIds.push(createdResponsible.id);

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

        const createDebit = container.resolve(CreateDebitService);

        const debitInitialDate = new Date();
        const debitFinalDate = addMonths(debitInitialDate, 1);

        createDebit.execute({
            contract_id: createdContract.id,
            description: 'Primeira parcela da matrícula',
            initial_date: debitInitialDate,
            final_date: debitFinalDate,
            value: grade.value,
        });

        return {
            student_id: createdStudent.id,
            responsibles_ids: createdResponsiblesIds,
        };
    }
}
