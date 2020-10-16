import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';

import AppError from '@shared/errors/AppError';

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD || undefined,
});

const rateLimiterRedis = new RateLimiterRedis({
    storeClient: redisClient,
    points: 5,
    duration: 1,
    keyPrefix: 'rlflx',
});

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    try {
        await rateLimiterRedis.consume(request.ip);

        return next();
    } catch {
        throw new AppError('Too many requests!', 429);
    }
}
