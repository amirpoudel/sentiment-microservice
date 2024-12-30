import ApiResponse from "../../../lib/api/response.api";
import asyncHandler from "../../../lib/async/express.async";
import { Request,Response } from "express";
import { AppError } from "../../../lib/error/app.error";
import { IFileProcessingService } from "../../../interface/fileProcessing.interface";
import { randomUUID } from "crypto";



export class UploadFileController {
    private fileProcessingService;
    constructor(fileProcessingService:IFileProcessingService){
        this.fileProcessingService = fileProcessingService
    }

    upload = asyncHandler(async(req:Request,res:Response)=>{
   
        const filePath = req.file?.path;
        if(!filePath){
            throw AppError.badRequest("Unable to upload file ! please try again");
        }

        // after success fully upload. call the stream for process
        const bulkProcessId = randomUUID();
        this.fileProcessingService.processCSVFile(filePath,bulkProcessId);

        return res.status(200).json(new ApiResponse(200,{
            bulkProcessId
        },"Upload successfully"))

    })



}



