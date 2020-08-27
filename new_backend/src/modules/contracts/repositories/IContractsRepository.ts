import ICreateContractDTO from '@modules/contracts/dtos/ICreateContractDTO';
import Contract from '@modules/contracts/infra/typeorm/entities/Contract';

export default interface IContractsRepository {
    find(): Promise<Contract[] | []>;
    findById(id: string): Promise<Contract | undefined>;
    create(data: ICreateContractDTO): Promise<Contract>;
    save(contract: Contract): Promise<Contract>;
}
