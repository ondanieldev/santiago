"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IPaymentsRepository = _interopRequireDefault(require("../../payments/repositories/IPaymentsRepository"));

var _IDischargesRepository = _interopRequireDefault(require("../repositories/IDischargesRepository"));

var _IUsersRepository = _interopRequireDefault(require("../../users/repositories/IUsersRepository"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateDischargeService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PaymentsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('DischargesRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IPaymentsRepository.default === "undefined" ? Object : _IPaymentsRepository.default, typeof _IDischargesRepository.default === "undefined" ? Object : _IDischargesRepository.default, typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class CreateDischargeService {
  constructor(paymentsRepository, dischargesRepository, usersRepository, cacheProvider) {
    this.paymentsRepository = paymentsRepository;
    this.dischargesRepository = dischargesRepository;
    this.usersRepository = usersRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    payment_id,
    user_id
  }) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('não é possível receber um pagamento sem estar logado no sistema!');
    }

    const payment = await this.paymentsRepository.findById(payment_id);

    if (!payment) {
      throw new _AppError.default('não é possível recebr um pagamento inexistente!');
    }

    if (payment.discharged) {
      throw new _AppError.default('não é possível receber um pagamento que já foi recebido!');
    }

    const discharge = this.dischargesRepository.create({
      payment_id,
      user_id,
      receipt: payment.receipt
    });
    Object.assign(payment, {
      discharged: true,
      discharge_day: new Date()
    });
    await this.paymentsRepository.save(payment);
    return discharge;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateDischargeService;