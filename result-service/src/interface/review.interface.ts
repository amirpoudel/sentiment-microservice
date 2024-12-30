import { ReviewCreateInput, ReviewsQuery } from "../entities/review.entity";

export interface IReviewRepository{
    createReview(input: ReviewCreateInput): Promise<any>
    getReviews(query:ReviewsQuery): Promise<any>
}

export interface IReviewService{
    createReview(input: ReviewCreateInput): Promise<any>
    getReviews(query:ReviewsQuery): Promise<any>
}