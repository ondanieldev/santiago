"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _DisaprooveContractService = _interopRequireDefault(require("../../../services/DisaprooveContractService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DisaproovedContractsController {
  async update(request, response, _) {
    const {
      contract_id
    } = request.params;
    const {
      comment,
      responsible_email,
      responsible_name
    } = request.body;

    const disaprooveContract = _tsyringe.container.resolve(_DisaprooveContractService.default);

    const contract = await disaprooveContract.execute({
      contract_id,
      comment,
      responsible_contact: {
        email: responsible_email,
        name: responsible_name
      }
    });
    return response.json(contract);
  }

}

exports.default = DisaproovedContractsController;