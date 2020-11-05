import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IndexUnpaidExtraDebitsByContractService from '@modules/debits/services/IndexUnpaidExtraDebitsByContractService';

class ContractExtraDebitsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { contract_id } = request.params;

        const indexUnpaidExtraDebitsByContract = container.resolve(
            IndexUnpaidExtraDebitsByContractService,
        );

        const debits = await indexUnpaidExtraDebitsByContract.execute(
            contract_id,
        );

        return response.json(classToClass(debits));
    }
}

export default ContractExtraDebitsController;
