import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import FindPersonByCpfService from '../../../services/FindPersonByCpfService';
import CreatePersonService from '../../../services/CreatePersonService';
import UpdatePersonService from '../../../services/UpdatePersonService';

export default class PersonsController {
    public async show(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { cpf } = request.params;

        const findPersonByCpf = container.resolve(FindPersonByCpfService);

        const person = await findPersonByCpf.execute(cpf);

        return response.json(classToClass(person));
    }

    public async create(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const {
            name,
            birth_date,
            nacionality,
            civil_state,
            profission,
            cpf,
            rg,
            address_street,
            address_number,
            address_complement,
            address_neighborhood,
            address_city,
            address_cep,
            residencial_phone,
            commercial_phone,
            personal_phone,
            education_level,
            workplace,
            monthly_income,
            income_tax,
            email,
        } = request.body;

        const createPerson = container.resolve(CreatePersonService);

        const person = await createPerson.execute({
            name,
            birth_date,
            nacionality,
            civil_state,
            profission,
            cpf,
            rg,
            address_street,
            address_number,
            address_complement,
            address_neighborhood,
            address_city,
            address_cep,
            residencial_phone,
            commercial_phone,
            personal_phone,
            education_level,
            workplace,
            monthly_income,
            income_tax,
            email,
        });

        return response.json(classToClass(person));
    }

    public async update(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { person_id } = request.params;

        const {
            name,
            birth_date,
            nacionality,
            civil_state,
            profission,
            cpf,
            rg,
            address_street,
            address_number,
            address_complement,
            address_neighborhood,
            address_city,
            address_cep,
            residencial_phone,
            commercial_phone,
            personal_phone,
            education_level,
            workplace,
            monthly_income,
            income_tax,
            email,
        } = request.body;

        const updatePerson = container.resolve(UpdatePersonService);

        const person = await updatePerson.execute({
            id: person_id,
            name,
            birth_date,
            nacionality,
            civil_state,
            profission,
            cpf,
            rg,
            address_street,
            address_number,
            address_complement,
            address_neighborhood,
            address_city,
            address_cep,
            residencial_phone,
            commercial_phone,
            personal_phone,
            education_level,
            workplace,
            monthly_income,
            income_tax,
            email,
        });

        return response.json(classToClass(person));
    }
}
