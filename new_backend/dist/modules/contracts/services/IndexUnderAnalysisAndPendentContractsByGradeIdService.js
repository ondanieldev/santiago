"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IContractsRepository = _interopRequireDefault(require("../repositories/IContractsRepository"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let IndexUnderAnalysisAndPendentContractsByGradeService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ContractsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IContractsRepository.default === "undefined" ? Object : _IContractsRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class IndexUnderAnalysisAndPendentContractsByGradeService {
  constructor(contractsRepository, cacheProvider) {
    this.contractsRepository = contractsRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute(grade_id) {
    let contracts = await this.cacheProvider.recovery(`under-analysis-and-pendent-contracts:${grade_id}`);

    if (!contracts) {
      contracts = await this.contractsRepository.findUnderAnalysisAndPendentByGradeId(grade_id);
      await this.cacheProvider.register(`under-analysis-and-pendent-contracts:${grade_id}`, contracts);
    }

    return contracts;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = IndexUnderAnalysisAndPendentContractsByGradeService;
exports.default = _default;