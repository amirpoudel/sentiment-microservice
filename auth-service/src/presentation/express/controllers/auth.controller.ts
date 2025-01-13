import { AppError, asyncHandler  } from "backend-error-handler";
import { IAuthService } from "../../../interface/user.interface";
import { Request,Response } from "express";
import ApiResponse from "backend-error-handler/dist/api/response.api";


export class AuthController {

    private service: IAuthService;

    constructor(service:IAuthService){
        this.service = service
    }

    login = asyncHandler(async(req:Request,res:Response)=>{
        const {email , password} = req.body.data;
        if(!email || !password){
            throw AppError.badRequest("Email and Password Required")
        }

        const loginResponse = await this.service.login(email,password);
        return res.status(200).json(new ApiResponse(200,"login sucessfull"));

    })
}