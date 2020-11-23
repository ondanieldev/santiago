"use strict";

var _tsyringe = require("tsyringe");

var _cache = _interopRequireDefault(require("../../../../config/cache"));

var _RedisCacheProvider = _interopRequireDefault(require("./implementations/RedisCacheProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  redis: _RedisCacheProvider.default
};

_tsyringe.container.registerSingleton('CacheProvider', providers[_cache.default.driver]);