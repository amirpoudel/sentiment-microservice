import { Auth, UserCreateInput } from "../entities/auth.entity";


export interface IUserRepository{

    login(email:string,password:string):Promise<Auth | null>
}


export interface IAuthService{
    
    login(email:string,password:string):Promise<Auth>
}

