import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import GenerateContractPDFService from '../../../services/GenerateContractPDFService';
import GenerateChecklistPDFService from '../../../services/GenerateChecklistPDFService';
import GenerateEnrollmentFormPDFService from '../../../services/GenerateEnrollmentFormPDFService';

class ContractContractPDFController {
    public async create(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const { contract_id } = request.params;

        const generateContractPDF = container.resolve(
            GenerateContractPDFService,
        );

        const generateChecklistPDF = container.resolve(
            GenerateChecklistPDFService,
        );

        const generateEnrollmentFormPDF = container.resolve(
            GenerateEnrollmentFormPDFService,
        );

        await generateContractPDF.execute(contract_id);

        await generateChecklistPDF.execute(contract_id);

        const contractAfterLastUpdate = await generateEnrollmentFormPDF.execute(
            contract_id,
        );

        return response.json(classToClass(contractAfterLastUpdate));
    }
}

export default ContractContractPDFController;
