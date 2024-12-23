import ApiResponse from "../../../lib/api/response.api";
import asyncHandler from "../../../lib/async/express.async";
import { Request,Response } from "express";


export class UploadFileController {

    constructor(){

    }

    stream = asyncHandler(async(req:Request,res:Response)=>{
        console.log(req);

        return res.status(200).json(new ApiResponse(200,{},"Upload successfully"))

    })



}



