"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _DischargesController = _interopRequireDefault(require("../controllers/DischargesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dischargesRouter = (0, _express.Router)();
const dischargesController = new _DischargesController.default();
dischargesRouter.post('/', (req, res, next) => (0, _ensureAuthenticated.default)(['discharge_payments_permiss'])(req, res, next), (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    payment_id: _celebrate.Joi.string().uuid().required()
  }
}), dischargesController.create);
var _default = dischargesRouter;
exports.default = _default;