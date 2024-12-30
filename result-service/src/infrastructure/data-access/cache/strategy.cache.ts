import { CacheStrategy } from '../../../interface/cache.interface';
import { getCache, setCache } from './redis.cache';

export class CacheEnabledStrategy implements CacheStrategy {
  async getCache(key: string): Promise<any | null> {
    return await getCache(key);
  }

  async setCache(key: string, value: any): Promise<void> {
    await setCache(key, value);
  }
}


export class CacheDisabledStrategy implements CacheStrategy {
    async getCache(_: string): Promise<any | null> {
      return null; // Always return null to simulate no cache
    }
  
    async setCache(_: string, __: any): Promise<void> {
      // Do nothing eat five star chocolate
    }
  }
  