import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import InvalidateCacheService from '../../../services/InvalidateCacheService';

export default class CacheController {
    public async update(
        request: Request,
        response: Response,
        _: NextFunction,
    ): Promise<Response> {
        const invalidateCache = container.resolve(InvalidateCacheService);

        await invalidateCache.execute();

        return response.status(204).json();
    }
}
