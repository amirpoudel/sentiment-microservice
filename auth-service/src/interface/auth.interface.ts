import { LoginResponse } from "../entities/auth.entity";





export interface IAuthService{
    
    login(email:string,password:string):Promise<LoginResponse>

    verifyAccessToken(accessToken:string):Promise<boolean>

    
}

