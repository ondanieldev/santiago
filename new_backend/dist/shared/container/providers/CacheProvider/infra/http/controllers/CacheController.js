"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _InvalidateCacheService = _interopRequireDefault(require("../../../services/InvalidateCacheService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CacheController {
  async update(request, response, _) {
    const invalidateCache = _tsyringe.container.resolve(_InvalidateCacheService.default);

    await invalidateCache.execute();
    return response.status(204).json();
  }

}

exports.default = CacheController;