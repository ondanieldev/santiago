"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Debit = _interopRequireDefault(require("../entities/Debit"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DebitsRepository = (_dec = (0, _typeorm.EntityRepository)(_Debit.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class DebitsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Debit.default);
  }

  async findById(id) {
    const debit = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return debit;
  }

  async findByContract(contract_id) {
    const debits = await this.ormRepository.find({
      where: {
        contract_id
      },
      relations: ['payment'],
      order: {
        payment_limit_date: 'ASC'
      }
    });
    return debits;
  }

  async create(data) {
    const debit = this.ormRepository.create(data);
    await this.ormRepository.save(debit);
    return debit;
  }

  async save(debit) {
    await this.ormRepository.save(debit);
    return debit;
  }

  async deleteTypeExtra(debit_id) {
    await this.ormRepository.createQueryBuilder().delete().where('id = :debit_id', {
      debit_id
    }).execute();
  }

  async findUnpaidExtraByContract(contract_id) {
    const debits = await this.ormRepository.find({
      where: {
        type: 'extra',
        paid: false,
        contract_id
      }
    });
    return debits;
  }

}, _temp)) || _class) || _class) || _class);
exports.default = DebitsRepository;