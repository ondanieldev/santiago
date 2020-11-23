"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateAgreementService = _interopRequireDefault(require("../../../services/CreateAgreementService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AgreementsController {
  async create(request, response, _) {
    const {
      contract_id,
      person_id,
      responsible_type
    } = request.body;

    const createAgreement = _tsyringe.container.resolve(_CreateAgreementService.default);

    const agreement = await createAgreement.execute({
      contract_id,
      person_id,
      responsible_type
    });
    return response.json(agreement);
  }

}

exports.default = AgreementsController;