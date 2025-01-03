
import { IUserService } from "../../../interface/user.interface";
import ApiResponse from "../../../lib/api/response.api";
import asyncHandler from "../../../lib/async/express.async";
import { Request,Response } from "express";


export class UserController {

    private userService: IUserService;
    constructor(userService: IUserService){
        this.userService = userService
    }

    createUser = asyncHandler(async(req:Request,res:Response)=>{
        const data = req.body.data;

        const response = await this.userService.createUser(data);

        return res.status(200).json(new ApiResponse(200,response,"User Create Successful"))
    })

}