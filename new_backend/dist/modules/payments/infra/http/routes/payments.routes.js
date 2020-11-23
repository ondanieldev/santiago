"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _PaymentsController = _interopRequireDefault(require("../controllers/PaymentsController"));

var _EnrollmentPaymentsController = _interopRequireDefault(require("../controllers/EnrollmentPaymentsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const paymentsRouter = (0, _express.Router)();
const paymentsController = new _PaymentsController.default();
const enrollmentPaymentsController = new _EnrollmentPaymentsController.default();
paymentsRouter.post('/', (req, res, next) => (0, _ensureAuthenticated.default)(['pay_debits_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    debit_id: _celebrate.Joi.string().uuid().required(),
    method: _celebrate.Joi.string().valid('creditCard', 'debitCard', 'cash', 'check', 'deposit', 'slip').required()
  }
}), paymentsController.create);
paymentsRouter.post('/enrollment', (req, res, next) => (0, _ensureAuthenticated.default)(['pay_debits_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    debit_id: _celebrate.Joi.string().uuid().required(),
    method: _celebrate.Joi.string().valid('creditCard', 'debitCard', 'cash', 'check', 'deposit', 'slip').required()
  }
}), enrollmentPaymentsController.create);
var _default = paymentsRouter;
exports.default = _default;