"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _CreateDischargeService = _interopRequireDefault(require("../../../services/CreateDischargeService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DischargesController {
  async create(request, response) {
    const {
      payment_id
    } = request.body;
    const user_id = request.user.id;

    const createDischarge = _tsyringe.container.resolve(_CreateDischargeService.default);

    const discharge = await createDischarge.execute({
      payment_id,
      user_id
    });
    return response.json((0, _classTransformer.classToClass)(discharge));
  }

}

exports.default = DischargesController;