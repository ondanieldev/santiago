"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeMailProvider {
  constructor() {
    this.mails = [];
  }

  async sendMail(data) {
    this.mails.push(data);
  }

}

exports.default = FakeMailProvider;