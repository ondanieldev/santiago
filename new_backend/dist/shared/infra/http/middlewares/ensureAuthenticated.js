"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _AppError = _interopRequireDefault(require("../../../errors/AppError"));

var _auth = _interopRequireDefault(require("../../../../config/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = permissions => {
  return (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new _AppError.default('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
      (0, _jsonwebtoken.verify)(token, _auth.default.jwt.secret);
      const decoded = (0, _jsonwebtoken.decode)(token);
      const {
        sub,
        iat,
        exp,
        ...permissionsFromToken
      } = decoded;
      request.user = {
        id: sub,
        ...permissionsFromToken
      };

      if (permissions) {
        let hasPermiss = false;
        permissions.forEach(permiss => {
          if (request.user[permiss]) {
            hasPermiss = true;
          }
        });

        if (hasPermiss) {
          return next();
        }

        throw new _AppError.default('');
      } else {
        return next();
      }
    } catch (err) {
      if (err instanceof _AppError.default) {
        throw new _AppError.default('You do not have permiss to execute this function!', 401);
      }

      throw new _AppError.default('Token expirado, faça login novamente!', 401);
    }
  };
};

exports.default = _default;