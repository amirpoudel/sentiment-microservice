import { Request,Response } from "express";
import { IProcessReviewService } from "../../../interface/process.interface";
import asyncHandler from "../../../lib/async/express.async";
import ApiResponse from "../../../lib/api/response.api";
import { randomUUID } from "crypto";
import { AppError } from "../../../lib/error/app.error";
import { getRequestQuery } from "../../../lib/helper/helper";



export class ProcessReviewController{

    private processReviewService: IProcessReviewService;

    constructor(processReviewService: IProcessReviewService){
        this.processReviewService = processReviewService
    }

    insertBulkReview = asyncHandler(async (req:Request,res:Response)=>{

        const userId = req.headers["x-user-id"] as string;
        if(!userId){
            throw AppError.badRequest("User Id Required in headers")
        }
        const bulkReviews = req.body.data;
        bulkReviews.userId = userId
        const response = await this.processReviewService.insertBulkReview(bulkReviews);
        return res.status(200).json(new ApiResponse(200,response,"Bulk review inserted successfully"))
    })

    insertReview = asyncHandler(async (req:Request,res:Response)=>{
        const userId = req.headers["x-user-id"] as string;
        if(!userId){
            throw AppError.badRequest("User Id Required in headers")
        }
        const review = req.body.data;
        const response = await this.processReviewService.insertReview(userId,review);
        return res.status(200).json(new ApiResponse(200,response,"Review inserted successfully"))
    })

    uploadFile = asyncHandler(async(req:Request,res:Response)=>{
        const userId = req.headers["x-user-id"] as string;
        if(!userId){
            throw AppError.badRequest("User Id Required in headers")
        }
        const filePath = req.file?.path;
        if(!filePath){
            throw AppError.badRequest("Unable to upload file ! please try again");
        }

        // after success fully upload. call the stream for process
        this.processReviewService.processCSVFile(filePath,userId);

        return res.status(200).json(new ApiResponse(200,{
        
        },"Upload successfully"))

    })

    getProcessMetadata = asyncHandler(async(req:Request,res:Response)=>{
        const userId = req.headers["x-user-id"] as string;
        if(!userId){
            throw AppError.badRequest("User Id Required in headers")
        }
        
        const query = getRequestQuery(req.query)
        query.filter.userId  = userId
        const response = await this.processReviewService.getProcessMetadata(query)
        return res.status(200).json(new ApiResponse(200,response,"Fetch sucess"))

    })


}