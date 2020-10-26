import { Router } from 'express';

import CacheController from '../controllers/CacheController';

const cacheRoutes = Router();

const cacheController = new CacheController();

cacheRoutes.put('/invalidate', cacheController.update);

export default cacheRoutes;
