"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _mime = _interopRequireDefault(require("mime"));

var _s = _interopRequireDefault(require("aws-sdk/clients/s3"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AmazonS3StorageProvider {
  constructor() {
    this.clientS3 = void 0;
    this.clientS3 = new _s.default({
      region: _upload.default.config.s3.region
    });
  }

  async saveFile(file) {
    const filePath = _path.default.resolve(_upload.default.tmpFolder, file);

    const ContentType = _mime.default.getType(filePath);

    if (!ContentType) {
      throw new Error('arquivo não encontrado!');
    }

    const fileContent = await _fs.default.promises.readFile(filePath);
    await this.clientS3.putObject({
      Bucket: _upload.default.config.s3.bucket,
      Key: file,
      ACL: _upload.default.config.s3.permission,
      Body: fileContent,
      ContentType
    }).promise();

    try {
      await _fs.default.promises.stat(filePath);
      await _fs.default.promises.unlink(filePath);
    } catch {}

    return file;
  }

  async deleteFile(file) {
    await this.clientS3.deleteObject({
      Bucket: _upload.default.config.s3.bucket,
      Key: file
    }).promise();
  }

}

var _default = AmazonS3StorageProvider;
exports.default = _default;