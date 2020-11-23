"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeCacheProvider {
  constructor() {
    this.cache = {};
  }

  async register(key, value) {
    this.cache[key] = JSON.stringify(value);
  }

  async recovery(key) {
    if (!this.cache[key]) {
      return null;
    }

    return JSON.parse(this.cache[key]);
  }

  async invalidate(key) {
    delete this.cache[key];
  }

  async invalidatePrefix(prefix) {
    const keys = Object.keys(this.cache).filter(key => key.startsWith(`${prefix}:`));
    keys.forEach(key => {
      delete this.cache[key];
    });
  }

}

exports.default = FakeCacheProvider;