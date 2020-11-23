"use strict";

var _tsyringe = require("tsyringe");

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _DiskStorageProvider = _interopRequireDefault(require("./implementations/DiskStorageProvider"));

var _AmazonS3StorageProvider = _interopRequireDefault(require("./implementations/AmazonS3StorageProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  disk: _DiskStorageProvider.default,
  s3: _AmazonS3StorageProvider.default
};

_tsyringe.container.registerSingleton('StorageProvider', providers[_upload.default.driver]);