"use strict";

var _tsyringe = require("tsyringe");

var _PDFReceiptProvider = _interopRequireDefault(require("./implementations/PDFReceiptProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  pdf: _tsyringe.container.resolve(_PDFReceiptProvider.default)
};

_tsyringe.container.registerInstance('ReceiptProvider', providers.pdf);