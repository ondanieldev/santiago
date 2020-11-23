"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Discharge = _interopRequireDefault(require("../../infra/typeorm/entities/Discharge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PaymentsRepository {
  constructor() {
    this.discharges = [];
  }

  async create(data) {
    const discharge = new _Discharge.default();
    Object.assign(discharge, data);
    this.discharges.push(discharge);
    return discharge;
  }

}

exports.default = PaymentsRepository;