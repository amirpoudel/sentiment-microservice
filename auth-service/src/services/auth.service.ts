import {AppError, trycatchWrapper} from "backend-error-handler";
import { IAuthService } from "../interface/auth.interface";
import { findUser } from "../presentation/grpc/grpc.service";
import { LoginResponse, UserGRPCResponse, VerifyTokenResponse } from "../entities/auth.entity";
import { comparePassword } from "../lib/auth/bcrypt";
import { generateAccessToken, verifyAccessToken } from "../lib/auth/jwt";

import * as jwt from "jsonwebtoken";



export class AuthService implements IAuthService{
    //private userRepository: IUserRepository;

    constructor(){
        //this.userRepository = userRepository;
    }


    login = trycatchWrapper(async(email:string,password:string):Promise<LoginResponse|null>=>{
        // write login function 
        // find user from grpc
        const resposne = await findUser(email.toLocaleLowerCase()) as UserGRPCResponse;
        if(!resposne){
            return null
        }
        console.log("response from grpc",resposne);
        console.log(resposne.password)
        const isPasswordMatch = await comparePassword(password,resposne.password)
        if(!isPasswordMatch){
            throw AppError.badRequest("Email or Password Invalid")
        }
        // const generate accessToken 
        const accessToken = await generateAccessToken({
            id:resposne.id,
            name:resposne.name,
            email:resposne.email
        })
        return {
            id:resposne.id,
            name:resposne.name,
            email:resposne.email,
            accessToken:accessToken
        }
    })


    verifyAccessToken = trycatchWrapper(async(token:string):Promise<VerifyTokenResponse>=>{
        //const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer", "").trim(); // header for mobile
     
        if (!token ) {
            throw (AppError.invalidCredentials("Access token not found"));
        }
        const accessTokenSecret: jwt.Secret | undefined = process.env.ACCESS_TOKEN_SECRET;
        if (!accessTokenSecret) {
            throw (AppError.internalServerError("Access token secret not found"));
        }
        const decoded = jwt.verify(token, accessTokenSecret as jwt.Secret) as any

        //req["user"] = decoded 
        return {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email
        }
    })


}