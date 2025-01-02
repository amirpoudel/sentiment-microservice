import { ReviewCreateInput, ReviewsGetQueryOptions } from "../entities/review.entity";
import { IReviewRepository, IReviewService } from "../interface/review.interface";
import { trycatchWrapper } from "../lib/async/trycatch.async";


export class ReviewService implements IReviewService{
    private reviewRepository: IReviewRepository;
    constructor(reviewRepository: IReviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    createReview = trycatchWrapper(async (input: ReviewCreateInput) => {
        return await this.reviewRepository.createReview(input);
    })

    getReviews = trycatchWrapper(async (query:ReviewsGetQueryOptions) => {
        return await this.reviewRepository.getReviews(query);
    })
}



