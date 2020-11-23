"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rateLimiter;

var _rateLimiterFlexible = require("rate-limiter-flexible");

var _ioredis = _interopRequireDefault(require("ioredis"));

var _AppError = _interopRequireDefault(require("../../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const redisClient = new _ioredis.default({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD || undefined
});
const rateLimiterRedis = new _rateLimiterFlexible.RateLimiterRedis({
  storeClient: redisClient,
  points: 5,
  duration: 1,
  keyPrefix: 'rlflx'
});

async function rateLimiter(request, response, next) {
  try {
    await rateLimiterRedis.consume(request.ip);
    return next();
  } catch {
    throw new _AppError.default('Too many requests!', 429);
  }
}