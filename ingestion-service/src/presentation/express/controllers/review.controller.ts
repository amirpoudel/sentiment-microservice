import { Request,Response } from "express";
import { IReviewService } from "../../../interface/review.interface";
import asyncHandler from "../../../lib/async/express.async";
import ApiResponse from "../../../lib/api/response.api";


export class ReviewController {

    private reviewService: IReviewService;

    constructor(reviewService: IReviewService) {
        this.reviewService = reviewService;
    }

    insertBulkReview = asyncHandler(async (req:Request,res:Response)=>{
        const bulkReviews = req.body.data;
        const response = await this.reviewService.insertBulkReview(bulkReviews);
        return res.status(200).json(new ApiResponse(200,response,"Bulk review inserted successfully"))
    })

    insertReview = asyncHandler(async (req:Request,res:Response)=>{
        const review = req.body.data;
        const response = await this.reviewService.insertReview(review);
        return res.status(200).json(new ApiResponse(200,response,"Review inserted successfully"))
    })
}