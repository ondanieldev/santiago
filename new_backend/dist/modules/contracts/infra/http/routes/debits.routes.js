"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _ContractDebitsController = _interopRequireDefault(require("../controllers/ContractDebitsController"));

var _ContractExtraDebitsController = _interopRequireDefault(require("../controllers/ContractExtraDebitsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debitsRouter = (0, _express.Router)();
const contractDebitsController = new _ContractDebitsController.default();
const contractExtraDebitsController = new _ContractExtraDebitsController.default();
debitsRouter.get('/:contract_id/debits', (req, res, next) => (0, _ensureAuthenticated.default)(['pay_debits_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    contract_id: _celebrate.Joi.string().uuid().required()
  }
}), contractDebitsController.index);
debitsRouter.get('/:contract_id/debits/extra', (req, res, next) => (0, _ensureAuthenticated.default)(['crud_extra_debits_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    contract_id: _celebrate.Joi.string().uuid().required()
  }
}), contractExtraDebitsController.index);
var _default = debitsRouter;
exports.default = _default;