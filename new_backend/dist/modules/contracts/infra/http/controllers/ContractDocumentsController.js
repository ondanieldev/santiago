"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _GenerateContractPDFService = _interopRequireDefault(require("../../../services/GenerateContractPDFService"));

var _GenerateChecklistPDFService = _interopRequireDefault(require("../../../services/GenerateChecklistPDFService"));

var _GenerateEnrollmentFormPDFService = _interopRequireDefault(require("../../../services/GenerateEnrollmentFormPDFService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContractContractPDFController {
  async create(request, response, _) {
    const {
      contract_id
    } = request.params;

    const generateContractPDF = _tsyringe.container.resolve(_GenerateContractPDFService.default);

    const generateChecklistPDF = _tsyringe.container.resolve(_GenerateChecklistPDFService.default);

    const generateEnrollmentFormPDF = _tsyringe.container.resolve(_GenerateEnrollmentFormPDFService.default);

    await generateContractPDF.execute(contract_id);
    await generateChecklistPDF.execute(contract_id);
    const contractAfterLastUpdate = await generateEnrollmentFormPDF.execute(contract_id);
    return response.json((0, _classTransformer.classToClass)(contractAfterLastUpdate));
  }

}

var _default = ContractContractPDFController;
exports.default = _default;