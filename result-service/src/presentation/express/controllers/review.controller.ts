import { IReviewService } from "../../../interface/review.interface";
import ApiResponse from "../../../lib/api/response.api";
import asyncHandler from "../../../lib/async/express.async";
import { getRequestQuery } from "../../../lib/helper/helper";
import { Request,Response } from "express";


export class ReviewController {

    private reviewService: IReviewService;
    constructor(reviewService: IReviewService) {
        this.reviewService = reviewService;
    }

    getReviews = asyncHandler(async (req:Request, res:Response) => {
        const query = getRequestQuery(req.query);

        const reviews = await this.reviewService.getReviews(query);

        return res.status(200).json(new ApiResponse(200, reviews, "Reviews fetched successfully"));
    })

}