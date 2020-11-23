"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _ContractPaymentsController = _interopRequireDefault(require("../controllers/ContractPaymentsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debitsRouter = (0, _express.Router)();
const contractPaymentsController = new _ContractPaymentsController.default();
debitsRouter.get('/:contract_id/payments', (req, res, next) => (0, _ensureAuthenticated.default)(['discharge_payments_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    contract_id: _celebrate.Joi.string().uuid().required()
  }
}), contractPaymentsController.index);
var _default = debitsRouter;
exports.default = _default;