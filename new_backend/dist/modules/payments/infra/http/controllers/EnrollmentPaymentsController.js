"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _CreateEnrollmentPaymentService = _interopRequireDefault(require("../../../services/CreateEnrollmentPaymentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PaymentsController {
  async create(request, response) {
    const {
      debit_id,
      method
    } = request.body;
    const user_id = request.user.id;

    const createPayment = _tsyringe.container.resolve(_CreateEnrollmentPaymentService.default);

    const payment = await createPayment.execute({
      debit_id,
      method,
      user_id
    });
    return response.json((0, _classTransformer.classToClass)(payment));
  }

}

exports.default = PaymentsController;