"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Payment = _interopRequireDefault(require("../entities/Payment"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let PaymentsRepository = (_dec = (0, _typeorm.EntityRepository)(_Payment.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class PaymentsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Payment.default);
  }

  async findById(id) {
    const payment = await this.ormRepository.findOne({
      where: {
        id
      }
    });
    return payment;
  }

  async findByContract(contract_id) {
    const payments = await this.ormRepository.createQueryBuilder('payment').select('payment').addSelect('user').leftJoin('payment.user', 'user', 'user.id = payment.user_id').leftJoin('payment.debit', 'debit', 'debit.id = payment.debit_id').leftJoinAndSelect('payment.discharge', 'discharge').where('debit.contract_id = :contract_id', {
      contract_id
    }).getMany();
    return payments;
  }

  async create(data) {
    const payment = this.ormRepository.create(data);
    await this.ormRepository.save(payment);
    return payment;
  }

  async save(payment) {
    await this.ormRepository.save(payment);
    return payment;
  }

}, _temp)) || _class) || _class) || _class);
exports.default = PaymentsRepository;