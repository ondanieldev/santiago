"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeHashProvider {
  async generateHash(content) {
    return _bcryptjs.default.hash(content, 8);
  }

  async compare(content, hashedConent) {
    return _bcryptjs.default.compare(content, hashedConent);
  }

}

exports.default = FakeHashProvider;