"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IContractsRepository = _interopRequireDefault(require("../repositories/IContractsRepository"));

var _IDebitsRepository = _interopRequireDefault(require("../../debits/repositories/IDebitsRepository"));

var _IMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/models/IMailProvider"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _formatFunctions = require("../../../shared/utils/formatFunctions");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AprooveContractService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ContractsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('DebitsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('MailProvider')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IContractsRepository.default === "undefined" ? Object : _IContractsRepository.default, typeof _IDebitsRepository.default === "undefined" ? Object : _IDebitsRepository.default, typeof _IMailProvider.default === "undefined" ? Object : _IMailProvider.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class AprooveContractService {
  constructor(contractsRepository, debitsRepository, mailProvider, cacheProvider) {
    this.contractsRepository = contractsRepository;
    this.debitsRepository = debitsRepository;
    this.mailProvider = mailProvider;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    contract_id,
    comment,
    responsible_contact,
    discount
  }) {
    const contract = await this.contractsRepository.findById(contract_id);

    if (!contract) {
      throw new _AppError.default('não é possível aprovar um contrato inexistente!');
    }

    if (contract.status === 'accepted' || contract.status === 'active') {
      throw new _AppError.default('não é possível aprovar um contrato que já foi aprovado ou que já está ativo!');
    }

    if (discount && discount < 0) {
      throw new _AppError.default('não é possível aplicar um desconto negativo!');
    } else if (!discount) {
      discount = 0;
    }

    Object.assign(contract, {
      comment,
      status: 'accepted',
      discount
    });
    await this.contractsRepository.save(contract);
    await this.debitsRepository.create({
      contract_id,
      description: '1ª parcela - Matrícula',
      payment_limit_date: (0, _dateFns.addMonths)(new Date(), 1),
      value: contract.grade.value,
      type: 'enrollment'
    });

    if (responsible_contact) {
      await this.mailProvider.sendMail({
        to: {
          name: responsible_contact.name,
          email: responsible_contact.email
        },
        subject: '[Santiago] Matrícula Aprovada',
        body: {
          file: 'notify_aproove_enrollment.hbs',
          variables: {
            responsibleName: (0, _formatFunctions.capitalize)(responsible_contact.name)
          }
        }
      });
    }

    await this.cacheProvider.invalidate(`under-analysis-and-pendent-contracts:${contract.grade_id}`);
    await this.cacheProvider.invalidate(`accepted-and-active-contracts:${contract.grade_id}`);
    return contract;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = AprooveContractService;