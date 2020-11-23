"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const tmpFolder = _path.default.resolve(__dirname, '..', '..', 'tmp');

const uploadFolder = _path.default.resolve(__dirname, '..', '..', 'tmp', 'upload');

var _default = {
  tmpFolder,
  uploadFolder,
  driver: process.env.STORAGE_PROVIDER || 'disk',
  multer: {
    storage: _multer.default.diskStorage({
      destination: tmpFolder,

      filename(request, file, callback) {
        const fileHash = (0, _uuid.v4)();
        const fileName = `${fileHash}-${file.originalname}`;
        return callback(null, fileName);
      }

    })
  },
  config: {
    disk: {},
    s3: {
      region: process.env.AWS_DEFAULT_REGION,
      bucket: process.env.AWS_S3_BUCKET,
      permission: process.env.AWS_S3_PERMISSION,
      baseURL: process.env.AWS_S3_URL
    }
  }
};
exports.default = _default;