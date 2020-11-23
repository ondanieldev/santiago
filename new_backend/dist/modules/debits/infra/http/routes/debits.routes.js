"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _ExtraDebitsController = _interopRequireDefault(require("../controllers/ExtraDebitsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debitsRouter = (0, _express.Router)();
const extraDebitsController = new _ExtraDebitsController.default();
debitsRouter.post('/extra', (req, res, next) => (0, _ensureAuthenticated.default)(['create_extra_debits_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    contract_id: _celebrate.Joi.string().uuid().required(),
    description: _celebrate.Joi.string().required(),
    payment_limit_date: _celebrate.Joi.date().required(),
    value: _celebrate.Joi.number().positive().required(),
    discount: _celebrate.Joi.number().min(0),
    apply_interest_rules: _celebrate.Joi.boolean()
  }
}), extraDebitsController.create);
debitsRouter.put('/extra/:debit_id', (req, res, next) => (0, _ensureAuthenticated.default)(['crud_extra_debits_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    debit_id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    description: _celebrate.Joi.string().required(),
    payment_limit_date: _celebrate.Joi.date().required(),
    value: _celebrate.Joi.number().integer().required(),
    discount: _celebrate.Joi.number().min(0),
    apply_interest_rules: _celebrate.Joi.boolean()
  }
}), extraDebitsController.update);
debitsRouter.delete('/extra/:debit_id', (req, res, next) => (0, _ensureAuthenticated.default)(['crud_extra_debits_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    debit_id: _celebrate.Joi.string().uuid().required()
  }
}), extraDebitsController.delete);
var _default = debitsRouter;
exports.default = _default;