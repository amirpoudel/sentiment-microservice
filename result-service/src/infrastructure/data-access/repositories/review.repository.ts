import { and, eq, SQL } from 'drizzle-orm';
import { ReviewCreateInput, ReviewsQuery } from '../../../entities/review.entity';
import { IReviewRepository } from '../../../interface/review.interface';
import {db} from '../db';
import { reviews } from '../db/schema';
import { UUID } from 'crypto';

import { setCache,getCache, generateCacheKey } from '../cache/redis.cache';
import { CacheStrategy } from '../../../interface/cache.interface';


const buildQuery = (table: typeof reviews,query:ReviewsQuery)=>{
    const {filter,limit,offset,sort} = query;

    const conditions : SQL[] = [];
    if(filter){
        Object.keys(filter).forEach((key)=>{
            conditions.push(eq(table?.bulkProcessId,filter.bulkProcessId as UUID))
        })
    }

    const whereConditions =  conditions.length > 0 ? and(...conditions) : undefined;
    return {
        where: whereConditions,
        limit,
        offset,
        orderBy: sort ? {
            [sort.field]: sort.order
        } : undefined
    }
}

export class ReviewRepository implements IReviewRepository{
    private db ;
    private cache : CacheStrategy;
    constructor(cacheStrategy:CacheStrategy){ 
        this.db = db;
        this.cache = cacheStrategy;
    }


    createReview = async(input: ReviewCreateInput) => {
        return await this.db.insert(reviews).values({
            ...input
        })
    }

    getReviews = async(query: ReviewsQuery) => {
        const {where} = buildQuery(reviews,query);
     
        const cacheKey = generateCacheKey('reviews',query);
        console.log('Cache key:',cacheKey);
        const cache = this.cache.getCache(cacheKey);
        if(cache){
            console.log('Cache hit');
            return cache;
        }
        console.log('Cache miss');
        const response =  await this.db.select().from(reviews).where(where).limit(query.limit).offset(query.offset).execute();
        // set cache
        await this.cache.setCache(cacheKey,response);
        return response;
    }
}



