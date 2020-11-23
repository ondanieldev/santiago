"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeStorageProvider {
  constructor() {
    this.files = [];
  }

  async saveFile(file) {
    this.files.push(file);
    return file;
  }

  async deleteFile(file) {
    const deleteIndex = this.files.findIndex(findFile => findFile === file);
    this.files.splice(deleteIndex, 1);
  }

}

exports.default = FakeStorageProvider;