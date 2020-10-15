import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
    private client: RedisClient;

    constructor() {
        this.client = new Redis(cacheConfig.config.redis);
    }

    public async register(key: string, value: any): Promise<void> {
        await this.client.set(key, JSON.stringify(value));
    }

    public async recovery<T>(key: string): Promise<T | null> {
        const value = await this.client.get(key);

        if (!value) {
            return null;
        }

        return JSON.parse(value) as T;
    }

    public async invalidate(key: string): Promise<void> {
        await this.client.del(key);
    }
}
