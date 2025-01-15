import { and, desc, eq, SQL } from "drizzle-orm";
import { ProcessCreateInput, ProcessReviewsGetQueryOptions } from "../../../entities/process";
import { IProcessReviewRepository } from "../../../interface/process.interface";
import { db } from "../db";
import { processReviews } from "../db/schema";

const buildQuery = (table: typeof processReviews, query: ProcessReviewsGetQueryOptions) => {
    const { filter, limit, offset, sort } = query;
    console.log("query", query);

    const conditions: SQL[] = [];
    if (filter) {
        Object.keys(filter).forEach((key: string) => {
            if (key === "userId") {
                conditions.push(eq(table?.userId, filter.userId!));
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


export class ProcessReviewRepository  implements IProcessReviewRepository{
    private db;

    constructor(){
        this.db = db;
    }

    insertProcessMetadata = async(input:ProcessCreateInput)=>{
        return await this.db.insert(processReviews).values({
            ...input
        })
    }

    getProcessMetadata = async (query: ProcessReviewsGetQueryOptions) => {
        const { where, limit, offset, orderFunction } = buildQuery(processReviews, query);

       
        console.log(orderFunction);

        // Apply the orderFunction in the orderBy method
        const response = await this.db
            .select()
            .from(processReviews)
            .where(where)
            .limit(limit)
            .offset(offset)
            .orderBy(desc(processReviews.createdAt))
            
            .execute();

        return response;
    }
    
}