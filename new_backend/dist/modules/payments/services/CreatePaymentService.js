"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IUsersRepository = _interopRequireDefault(require("../../users/repositories/IUsersRepository"));

var _IDebitsRepository = _interopRequireDefault(require("../../debits/repositories/IDebitsRepository"));

var _IPaymentsRepository = _interopRequireDefault(require("../repositories/IPaymentsRepository"));

var _IReceiptProvider = _interopRequireDefault(require("../../../shared/container/providers/ReceiptProvider/models/IReceiptProvider"));

var _IContractsRepository = _interopRequireDefault(require("../../contracts/repositories/IContractsRepository"));

var _IStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/models/IStorageProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreatePaymentService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('DebitsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PaymentsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('ContractsRepository')(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)('ReceiptProvider')(target, undefined, 4);
}, _dec7 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 5);
}, _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [typeof _IDebitsRepository.default === "undefined" ? Object : _IDebitsRepository.default, typeof _IPaymentsRepository.default === "undefined" ? Object : _IPaymentsRepository.default, typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IContractsRepository.default === "undefined" ? Object : _IContractsRepository.default, typeof _IReceiptProvider.default === "undefined" ? Object : _IReceiptProvider.default, typeof _IStorageProvider.default === "undefined" ? Object : _IStorageProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = _dec9(_class = class CreatePaymentService {
  constructor(debitsRepository, paymentsRepository, usersRepository, contractsRepository, receiptProvider, storageProvider) {
    this.debitsRepository = debitsRepository;
    this.paymentsRepository = paymentsRepository;
    this.usersRepository = usersRepository;
    this.contractsRepository = contractsRepository;
    this.receiptProvider = receiptProvider;
    this.storageProvider = storageProvider;
  }

  async execute({
    method,
    debit_id,
    user_id
  }) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new _AppError.default('não é possível pagar um débito sem estar logado no sistema!');
    }

    const debit = await this.debitsRepository.findById(debit_id);

    if (!debit) {
      throw new _AppError.default('não é possível pagar um débito que não existe!');
    }

    if (debit.paid) {
      throw new _AppError.default('não é possível pagar um débito que já foi pago!');
    }

    if (debit.type === 'enrollment') {
      throw new _AppError.default('não é possível pagar um débito do tipo matrícula a partir deste serviço!');
    }

    const contract = await this.contractsRepository.findById(debit.contract_id);

    if (!contract) {
      throw new _AppError.default('não é possível pagar um débito de um contrato inexistente!');
    }

    let paymentValue = Number(debit.value);
    let paymentVariation = 0;
    let compoundVariation = false;
    const parsedDebitDate = (0, _dateFns.parseISO)(debit.payment_limit_date.toString());

    if ((0, _dateFns.isPast)(parsedDebitDate) && debit.apply_interest_rules) {
      const months = (0, _dateFns.differenceInCalendarMonths)(new Date(), parsedDebitDate);
      compoundVariation = true;
      paymentVariation = 3;
      paymentValue = debit.value * 1.03 ** months;
    } else if (!(0, _dateFns.isPast)(parsedDebitDate)) {
      paymentVariation = debit.discount;
      paymentValue = debit.value - debit.value * debit.discount / 100;
    }

    const receipt = await this.receiptProvider.generate({
      client: {
        name: contract.agreements[0].person.name,
        cpf: contract.agreements[0].person.cpf
      },
      operative: {
        name: user.username
      },
      items: [{
        description: debit.description,
        base_value: Number(debit.value),
        true_value: paymentValue,
        variation: paymentVariation,
        is_compound_variation: compoundVariation,
        quantity: 1
      }],
      method
    });
    await this.storageProvider.saveFile(receipt);
    const payment = await this.paymentsRepository.create({
      amount: paymentValue,
      debit_id,
      method,
      user_id,
      receipt
    });
    Object.assign(debit, {
      paid: true,
      payday: new Date()
    });
    await this.debitsRepository.save(debit);
    return payment;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreatePaymentService;