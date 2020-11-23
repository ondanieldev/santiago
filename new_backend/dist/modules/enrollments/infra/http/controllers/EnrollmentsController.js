"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateEnrollmentService = _interopRequireDefault(require("../../../services/CreateEnrollmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EnrollmentsController {
  async create(request, response, _) {
    const {
      financial_responsible,
      grade,
      student,
      supportive_responsible,
      financial_responsible_id,
      supportive_responsible_id
    } = request.body;

    const createEnrollment = _tsyringe.container.resolve(_CreateEnrollmentService.default);

    const {
      supportive_id,
      student_id,
      financial_id
    } = await createEnrollment.execute({
      financial_responsible,
      grade,
      student,
      supportive_responsible,
      financial_responsible_id,
      supportive_responsible_id
    });
    return response.status(200).send({
      supportive_id,
      student_id,
      financial_id
    });
  }

}

exports.default = EnrollmentsController;