"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeHashProvider {
  async generateHash(content) {
    return content;
  }

  async compare(content, hashedConent) {
    return content === hashedConent;
  }

}

exports.default = FakeHashProvider;