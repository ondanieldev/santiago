"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _ContractDocumentsController = _interopRequireDefault(require("../controllers/ContractDocumentsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const contractsDocumentsRoutes = (0, _express.Router)();
const contractDocumentsController = new _ContractDocumentsController.default();
contractsDocumentsRoutes.post('/:contract_id/documents', (req, res, _) => (0, _ensureAuthenticated.default)(['generate_documents_permiss'])(req, res, _), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    contract_id: _celebrate.Joi.string().uuid().required()
  }
}), contractDocumentsController.create);
var _default = contractsDocumentsRoutes;
exports.default = _default;