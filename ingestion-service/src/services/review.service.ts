import { BulkReviews, BulkReviewsProcessResponse, Review, ReviewProcessResponse } from "../entities/review";
import { produceMessage } from "../infrastructure/external-service/kafka/producer.kafka";
import { IReviewService } from "../interface/review.interface";
import { trycatchWrapper } from "../lib/async/trycatch.async";
import crypto from 'crypto'


export  class ReviewService implements IReviewService {

        insertBulkReview  = trycatchWrapper(async(bulkReviews:BulkReviews):Promise<BulkReviewsProcessResponse>=>{
            
            const processId = crypto.randomUUID();

            await Promise.all(
                bulkReviews.reviews.map(async (review) => {
                    produceMessage('reviews', JSON.stringify({ processId, ...review }));
                })
            );

            return { processId };

        })

        insertReview  = trycatchWrapper(async(review:Review):Promise<ReviewProcessResponse>=>{
            // insert single review
            const processId  = crypto.randomUUID()
            await produceMessage('reviews',JSON.stringify({
                processId,
                ...review
            }))
            return {processId}
            
        })


}