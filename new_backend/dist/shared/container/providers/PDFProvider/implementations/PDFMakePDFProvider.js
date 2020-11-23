"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pdfmake = _interopRequireDefault(require("pdfmake"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _uuid = require("uuid");

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line
class PDFMakePDFProvider {
  async parse(documentDefinition) {
    const fonts = {
      Arial: {
        normal: _path.default.resolve(__dirname, '..', 'fonts', 'arial.ttf'),
        bold: _path.default.resolve(__dirname, '..', 'fonts', 'arialbd.ttf')
      },
      Bank: {
        normal: _path.default.resolve(__dirname, '..', 'fonts', 'bank.otf'),
        bold: _path.default.resolve(__dirname, '..', 'fonts', 'bankbd.otf')
      }
    };
    const printer = new _pdfmake.default(fonts);
    const fileHash = (0, _uuid.v4)();
    const filename = `${fileHash}.pdf`;

    const filePath = _path.default.resolve(_upload.default.tmpFolder, filename);

    const pdfDoc = printer.createPdfKitDocument(documentDefinition);
    pdfDoc.pipe(_fs.default.createWriteStream(filePath));
    pdfDoc.end();
    return filename;
  }

}

exports.default = PDFMakePDFProvider;