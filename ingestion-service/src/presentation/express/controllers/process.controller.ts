import { Request,Response } from "express";
import { IProcessReviewService } from "../../../interface/process.interface";
import asyncHandler from "../../../lib/async/express.async";
import ApiResponse from "../../../lib/api/response.api";
import { randomUUID } from "crypto";
import { AppError } from "../../../lib/error/app.error";



export class ProcessReviewController{

    private processReviewService: IProcessReviewService;

    constructor(processReviewService: IProcessReviewService){
        this.processReviewService = processReviewService
    }

    insertBulkReview = asyncHandler(async (req:Request,res:Response)=>{
        const bulkReviews = req.body.data;
        const response = await this.processReviewService.insertBulkReview(bulkReviews);
        return res.status(200).json(new ApiResponse(200,response,"Bulk review inserted successfully"))
    })

    insertReview = asyncHandler(async (req:Request,res:Response)=>{
        const review = req.body.data;
        const response = await this.processReviewService.insertReview(review);
        return res.status(200).json(new ApiResponse(200,response,"Review inserted successfully"))
    })

    uploadFile = asyncHandler(async(req:Request,res:Response)=>{
   
        const filePath = req.file?.path;
        if(!filePath){
            throw AppError.badRequest("Unable to upload file ! please try again");
        }

        // after success fully upload. call the stream for process
        const bulkProcessId = randomUUID();
        this.processReviewService.processCSVFile(filePath,bulkProcessId);

        return res.status(200).json(new ApiResponse(200,{
            bulkProcessId
        },"Upload successfully"))

    })


}