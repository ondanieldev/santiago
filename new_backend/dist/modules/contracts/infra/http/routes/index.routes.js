"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _debits = _interopRequireDefault(require("./debits.routes"));

var _payments = _interopRequireDefault(require("./payments.routes"));

var _contracts = _interopRequireDefault(require("./contracts.routes"));

var _contractDocuments = _interopRequireDefault(require("./contractDocuments.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const contractsRoutes = (0, _express.Router)();
contractsRoutes.use('/', _contracts.default);
contractsRoutes.use('/', _debits.default);
contractsRoutes.use('/', _payments.default);
contractsRoutes.use('/', _contractDocuments.default);
var _default = contractsRoutes;
exports.default = _default;