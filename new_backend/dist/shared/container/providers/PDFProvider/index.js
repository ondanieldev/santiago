"use strict";

var _tsyringe = require("tsyringe");

var _PDFMakePDFProvider = _interopRequireDefault(require("./implementations/PDFMakePDFProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  pdfmake: _PDFMakePDFProvider.default
};

_tsyringe.container.registerSingleton('PDFProvider', providers.pdfmake);