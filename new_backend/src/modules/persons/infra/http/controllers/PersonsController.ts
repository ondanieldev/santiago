import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindPersonByCpfService from '@modules/persons/services/FindPersonByCpfService';

export default class PersonsController {
    public async get(request: Request, response: Response): Promise<Response> {
        const { cpf } = request.params;

        const findPersonByCpf = container.resolve(FindPersonByCpfService);

        const person = await findPersonByCpf.execute(cpf);

        return response.json(person);
    }
}
