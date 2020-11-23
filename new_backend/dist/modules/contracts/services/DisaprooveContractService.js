"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IContractsRepository = _interopRequireDefault(require("../repositories/IContractsRepository"));

var _IMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/models/IMailProvider"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _formatFunctions = require("../../../shared/utils/formatFunctions");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DisaprooveContractService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ContractsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('MailProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IContractsRepository.default === "undefined" ? Object : _IContractsRepository.default, typeof _IMailProvider.default === "undefined" ? Object : _IMailProvider.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class DisaprooveContractService {
  constructor(contractsRepository, mailProvider, cacheProvider) {
    this.contractsRepository = contractsRepository;
    this.mailProvider = mailProvider;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    contract_id,
    comment,
    responsible_contact
  }) {
    const contract = await this.contractsRepository.findById(contract_id);

    if (!contract) {
      throw new _AppError.default('não é possível reprovar um contrato inexistente!');
    }

    if (contract.status === 'accepted' || contract.status === 'active') {
      throw new _AppError.default('não é possível reprovar um contrato que já foi aceitou ou que já está ativo!');
    }

    Object.assign(contract, {
      comment,
      status: 'pendent'
    });
    await this.contractsRepository.save(contract);

    if (responsible_contact) {
      await this.mailProvider.sendMail({
        to: {
          name: responsible_contact.name,
          email: responsible_contact.email
        },
        subject: '[Santiago] Matrícula Pendente',
        body: {
          file: 'notify_disaproove_enrollment.hbs',
          variables: {
            responsibleName: (0, _formatFunctions.capitalize)(responsible_contact.name),
            comment: (0, _formatFunctions.capitalize)(comment) || 'Comentário indisponível.'
          }
        }
      });
    }

    await this.cacheProvider.invalidate(`under-analysis-and-pendent-contracts:${contract.grade_id}`);
    return contract;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = DisaprooveContractService;