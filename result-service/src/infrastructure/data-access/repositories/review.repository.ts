import { and, desc, eq, SQL, asc } from 'drizzle-orm';
import { ReviewCreateInput, ReviewsGetQueryOptions } from '../../../entities/review.entity';
import { IReviewRepository } from '../../../interface/review.interface';
import { db } from '../db';
import { analysisReviews } from '../db/schema';


import { setCache, getCache, generateCacheKey } from '../cache/redis.cache';
import { CacheStrategy } from '../../../interface/cache.interface';
import { AnyColumn } from 'drizzle-orm';



const buildQuery = (table: typeof analysisReviews, query: ReviewsGetQueryOptions) => {
    const { filter, limit, offset, sort } = query;
    console.log("query", query);

    const conditions: SQL[] = [];
    if (filter) {
        Object.keys(filter).forEach((key: string) => {
            if (key === "processId") {
                conditions.push(eq(table?.processId, filter.processId!));
            }
            if (key === "sentiment") {
                conditions.push(eq(table?.sentiment, filter.sentiment!));
            }
        });
    }

    const whereConditions = conditions.length > 0 ? and(...conditions) : undefined;

    // Dynamically set the order function based on sort order
    let orderFunction = null;

    

   

    return {
        where: whereConditions,
        limit,
        offset,
        orderFunction,
    };
};


export class ReviewRepository implements IReviewRepository {
    private db;
    private cache: CacheStrategy;

    constructor(cacheStrategy: CacheStrategy) {
        this.db = db;
        this.cache = cacheStrategy;
    }

    createReview = async (input: ReviewCreateInput) => {
        return await this.db.insert(analysisReviews).values({
            ...input
        });
    };

    getReviews = async (query: ReviewsGetQueryOptions) => {
        const { where, limit, offset, orderFunction } = buildQuery(analysisReviews, query);

        const cacheKey = generateCacheKey('reviews', query);
        console.log('Cache key:', cacheKey);

        const cache = await this.cache.getCache(cacheKey);
        if (cache) {
            console.log('Cache hit');
            return cache;
        }

        console.log('Cache miss');
        console.log(orderFunction);

        // Apply the orderFunction in the orderBy method
        const response = await this.db
            .select()
            .from(analysisReviews)
            .where(where)
            .limit(limit)
            .offset(offset)
            .orderBy(desc(analysisReviews.createdAt))
            
            .execute();

        // Set cache after fetching
        await this.cache.setCache(cacheKey, response);
        return response;
    };
}
