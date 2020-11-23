import { injectable, inject } from 'tsyringe';

import ICacheProvider from '../models/ICacheProvider';

@injectable()
export default class InvalidateCacheService {
    constructor(
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute(): Promise<void> {
        await this.cacheProvider.invalidate('grades');
        await this.cacheProvider.invalidate('profiles');
        await this.cacheProvider.invalidate('users');
    }
}
