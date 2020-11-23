"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleClientErrors;

var _AppError = _interopRequireDefault(require("../../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleClientErrors(err, request, response, _) {
  if (err instanceof _AppError.default) {
    return response.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message
    });
  }

  console.log(err);
  return response.status(500).json({
    statusCode: 500,
    message: 'Internal server error.'
  });
}