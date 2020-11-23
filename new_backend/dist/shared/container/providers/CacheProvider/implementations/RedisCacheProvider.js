"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ioredis = _interopRequireDefault(require("ioredis"));

var _cache = _interopRequireDefault(require("../../../../../config/cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RedisCacheProvider {
  constructor() {
    this.client = void 0;
    this.client = new _ioredis.default(_cache.default.config.redis);
  }

  async register(key, value) {
    await this.client.set(key, JSON.stringify(value));
  }

  async recovery(key) {
    const value = await this.client.get(key);

    if (!value) {
      return null;
    }

    return JSON.parse(value);
  }

  async invalidate(key) {
    await this.client.del(key);
  }

  async invalidatePrefix(prefix) {
    const keys = await this.client.keys(`${prefix}:*`);
    const pipeline = this.client.pipeline();
    keys.forEach(key => {
      pipeline.del(key);
    });
    await pipeline.exec();
  }

}

exports.default = RedisCacheProvider;