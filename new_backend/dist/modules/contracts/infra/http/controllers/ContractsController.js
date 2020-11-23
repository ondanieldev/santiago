"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _FindContractByIdService = _interopRequireDefault(require("../../../services/FindContractByIdService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContractsController {
  async show(request, response, _) {
    const {
      contract_id
    } = request.params;

    const findContractById = _tsyringe.container.resolve(_FindContractByIdService.default);

    const contract = await findContractById.execute(contract_id);
    return response.json((0, _classTransformer.classToClass)(contract));
  }

}

exports.default = ContractsController;