export interface CacheStrategy {
    getCache(key: string): Promise<any | null>;
    setCache(key: string, value: any): Promise<void>;
}
  