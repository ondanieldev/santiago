import Contract from '@modules/contracts/infra/typeorm/entities/Contract';
import ICreateContractDTO from '@modules/contracts/dtos/ICreateContractDTO';
import IFindContractDTO from '@modules/contracts/dtos/IFindContractsDTO';

interface IFindResponse {
    contracts: Contract[] | [];
    pagination: number;
}

export default interface IContractsRepository {
    find(data: IFindContractDTO): Promise<IFindResponse>;
    findById(id: string): Promise<Contract | undefined>;
    create(data: ICreateContractDTO): Promise<Contract>;
    save(contract: Contract): Promise<Contract>;
}
