"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeReceiptProvider {
  constructor() {
    this.receipts = [];
  }

  async generate(data) {
    this.receipts.push(data);
    return 'receipt.txt';
  }

}

exports.default = FakeReceiptProvider;