import Discharge from '@modules/discharges/infra/typeorm/entities/Discharge';
import IDischargesRepository from '@modules/discharges/repositories/IDischargesRepository';
import ICreateDischargeDTO from '@modules/discharges/dtos/ICreateDischargeDTO';

export default class PaymentsRepository implements IDischargesRepository {
    private discharges: Discharge[] = [];

    public async create(data: ICreateDischargeDTO): Promise<Discharge> {
        const discharge = new Discharge();

        Object.assign(discharge, data);

        this.discharges.push(discharge);

        return discharge;
    }
}
