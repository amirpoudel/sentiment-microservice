import { BulkReviews, BulkReviewsProcessResponse, Review, ReviewProcessResponse } from "../entities/review"

export interface IReviewService{

    insertBulkReview(bulkReview:BulkReviews):Promise<ReviewProcessResponse>

    insertReview(review:Review):Promise<BulkReviewsProcessResponse>


  

}


export interface IReviewProducer{
    
}

