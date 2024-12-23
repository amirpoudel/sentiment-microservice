import ApiResponse from "../../../lib/api/response.api";
import asyncHandler from "../../../lib/async/express.async";
import { Request,Response } from "express";
import { AppError } from "../../../lib/error/app.error";


export class UploadFileController {

    constructor(){

    }

    upload = asyncHandler(async(req:Request,res:Response)=>{
        console.log(req);
        const filePath = req.file?.path;
        if(!filePath){
            throw AppError.badRequest("Unable to upload file ! please try again");
        }

        // after success fully upload. call the stream for process

        

        return res.status(200).json(new ApiResponse(200,{},"Upload successfully"))

    })



}



