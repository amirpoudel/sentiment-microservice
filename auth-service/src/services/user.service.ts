import { trycatchWrapper } from "backend-error-handler";
import { IAuthService } from "../interface/user.interface";




export class AuthService implements IAuthService{
    //private userRepository: IUserRepository;

    constructor(){
        //this.userRepository = userRepository;
    }


    login = trycatchWrapper(async(email:string,password:string)=>{
        // write login function 
    })


}