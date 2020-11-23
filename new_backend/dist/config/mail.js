"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const imagesFolder = _path.default.resolve(__dirname, '..', 'assets', 'images');

var _default = {
  imagesFolder,
  driver: process.env.MAIL_PROVIDER || 'ethereal',
  defaults: {
    from: {
      name: process.env.MAIL_DEFAULT_NAME,
      email: process.env.MAIL_DEFAULT_EMAIL
    }
  },
  config: {
    ses: {
      region: process.env.AWS_DEFAULT_REGION
    }
  }
};
exports.default = _default;