import Redis from "ioredis";

const redis = new Redis({

    host: process.env.REDIS_HOST || '192.168.1.66',
    port: Number(process.env.REDIS_PORT) || 6379,


})

// Function to generate a cache key based on ReviewsQuery
export function generateCacheKey(baseKey:string, query:any) {
    const { limit, offset, filter, sort } = query;
  
    // Build a query string from the parameters
    const filterStr = filter ? JSON.stringify(filter) : '';
    const sortStr = sort ? `${sort.field}:${sort.order}` : '';
  
    const cacheKey = `${baseKey}?limit=${limit}&offset=${offset}&filter=${filterStr}&sort=${sortStr}`;
    return cacheKey;
  }

// Function to get data from cache
export async function getCache(key:string) {
  try {
    const cachedData = await redis.get(key);
    if (cachedData) {
      console.log('Cache hit');
      return JSON.parse(cachedData); 
    }
    console.log('Cache miss');
    return null;
  } catch (error) {
    console.error('Error retrieving from cache:', error);
    return null;
  }
}


export async function setCache(key:string, data:any, ttl = 3600) {
  try {
    await redis.set(key, JSON.stringify(data), 'EX', ttl);
    console.log('Data cached successfully');
  } catch (error) {
    console.error('Error setting cache:', error);
  }
}


