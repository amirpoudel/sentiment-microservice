import { ReviewCreateInput } from '../../../entities/review.entity';
import { IReviewRepository } from '../../../interface/review.interface';
import {db} from '../db';
import { reviews } from '../db/schema';


export class ReviewRepository implements IReviewRepository{
    private db ;
    constructor() {
        this.db = db;
    }


    createReview = async(input: ReviewCreateInput) => {
        return await this.db.insert(reviews).values({
            ...input
        })
    }
}



