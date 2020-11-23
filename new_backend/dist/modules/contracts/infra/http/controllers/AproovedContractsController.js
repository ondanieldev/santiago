"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AprooveContractService = _interopRequireDefault(require("../../../services/AprooveContractService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AproovedContractsController {
  async update(request, response, _) {
    const {
      contract_id
    } = request.params;
    const {
      comment,
      responsible_email,
      responsible_name,
      discount
    } = request.body;

    const aprooveContract = _tsyringe.container.resolve(_AprooveContractService.default);

    const contract = await aprooveContract.execute({
      contract_id,
      comment,
      discount,
      responsible_contact: {
        email: responsible_email,
        name: responsible_name
      }
    });
    return response.json(contract);
  }

}

exports.default = AproovedContractsController;