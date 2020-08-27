import ICreateDischargeDTO from '@modules/discharges/dtos/ICreateDischargeDTO';
import Discharge from '@modules/discharges/infra/typeorm/entities/Discharge';

export default interface IPaymentsRepository {
    create(data: ICreateDischargeDTO): Promise<Discharge>;
}
