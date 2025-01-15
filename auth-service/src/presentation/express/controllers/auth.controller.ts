import { AppError, asyncHandler  } from "backend-error-handler";
import { IAuthService } from "../../../interface/auth.interface";
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
        if(!loginResponse){
            throw AppError.notFound("User Not Found")
        }
        return res.status(200).json(new ApiResponse(200,{
            id:loginResponse.id,
            name:loginResponse.name,
            email:loginResponse.email,
            accessToken:loginResponse.accessToken
        },"login sucessfull"));

    })

    verifyAccessToken = asyncHandler(async(req:Request,res:Response)=>{
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer", "").trim();
        if(!token){
            throw AppError.unauthorized("Access Token Required")
        }
        const response = await this.service.verifyAccessToken(token);
        return res.status(200).json(new ApiResponse(200,response,"Verify Access Token"))
    })
}