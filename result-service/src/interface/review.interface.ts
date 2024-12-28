import { ReviewCreateInput } from "../entities/review.entity";

export interface IReviewRepository{
    createReview(input: ReviewCreateInput): Promise<any>
}

export interface IReviewService{
    createReview(input: ReviewCreateInput): Promise<any>
}