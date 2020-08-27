import { EntityRepository, Repository, getRepository } from 'typeorm';

import Discharge from '@modules/discharges/infra/typeorm/entities/Discharge';
import IDischargesRepository from '@modules/discharges/repositories/IDischargesRepository';
import ICreateDischargeDTO from '@modules/discharges/dtos/ICreateDischargeDTO';

@EntityRepository(Discharge)
export default class PaymentsRepository implements IDischargesRepository {
    private ormRepository: Repository<Discharge>;

    constructor() {
        this.ormRepository = getRepository(Discharge);
    }

    public async create(data: ICreateDischargeDTO): Promise<Discharge> {
        const discharge = this.ormRepository.create(data);

        await this.ormRepository.save(discharge);

        return discharge;
    }
}
