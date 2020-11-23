"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Discharge = _interopRequireDefault(require("../entities/Discharge"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let PaymentsRepository = (_dec = (0, _typeorm.EntityRepository)(_Discharge.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class PaymentsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Discharge.default);
  }

  async create(data) {
    const discharge = this.ormRepository.create(data);
    await this.ormRepository.save(discharge);
    return discharge;
  }

}, _temp)) || _class) || _class) || _class);
exports.default = PaymentsRepository;