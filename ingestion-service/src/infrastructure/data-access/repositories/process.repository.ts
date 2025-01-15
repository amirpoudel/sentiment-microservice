import { ProcessCreateInput } from "../../../entities/process";
import { IProcessReviewRepository } from "../../../interface/process.interface";
import { db } from "../db";
import { processReviews } from "../db/schema";

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

    
}