import ICacheProvider from '../models/ICacheProvider';
import ICacheDTO from '../dtos/ICacheDTO';

export default class FakeCacheProvider implements ICacheProvider {
    private cache: ICacheDTO = {};

    public async register(key: string, value: any): Promise<void> {
        this.cache[key] = JSON.stringify(value);
    }

    public async recovery<T>(key: string): Promise<T | null> {
        if (!this.cache[key]) {
            return null;
        }

        return JSON.parse(this.cache[key]) as T;
    }

    public async invalidate(key: string): Promise<void> {
        delete this.cache[key];
    }

    public async invalidatePrefix(prefix: string): Promise<void> {
        const keys = Object.keys(this.cache).filter(key =>
            key.startsWith(`${prefix}:`),
        );

        keys.forEach(key => {
            delete this.cache[key];
        });
    }
}
