import { ReviewCreateInput, ReviewsGetQueryOptions, ReviewsGetResponse } from "../entities/review.entity";

export interface IReviewRepository{
    createReview(input: ReviewCreateInput): Promise<any>
    getReviews(query:ReviewsGetQueryOptions):Promise<ReviewsGetResponse>
}

export interface IReviewService{
    createReview(input: ReviewCreateInput): Promise<any>

    getReviews(query:ReviewsGetQueryOptions):Promise<ReviewsGetResponse>
    
}
