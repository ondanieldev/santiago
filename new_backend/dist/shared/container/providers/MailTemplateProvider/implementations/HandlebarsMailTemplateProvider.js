"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _handlebars = _interopRequireDefault(require("handlebars"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeHandlebarsTemplateProvider {
  async parse({
    file,
    variables
  }) {
    const stylesPath = _path.default.resolve(__dirname, '..', 'views', 'styles.hbs');

    const headerPath = _path.default.resolve(__dirname, '..', 'views', 'header.hbs');

    const filePath = _path.default.resolve(__dirname, '..', 'views', file);

    const footerPath = _path.default.resolve(__dirname, '..', 'views', 'footer.hbs');

    const styles = await _fs.default.promises.readFile(stylesPath, {
      encoding: 'utf-8'
    });
    const header = await _fs.default.promises.readFile(headerPath, {
      encoding: 'utf-8'
    });
    const templateContent = await _fs.default.promises.readFile(filePath, {
      encoding: 'utf-8'
    });
    const footer = await _fs.default.promises.readFile(footerPath, {
      encoding: 'utf-8'
    });

    const parseTemplate = _handlebars.default.compile(templateContent);

    const document = styles + header + parseTemplate(variables) + footer;
    return document;
  }

}

exports.default = FakeHandlebarsTemplateProvider;