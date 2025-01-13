import { trycatchWrapper } from "backend-error-handler";
import { IAuthService } from "../interface/user.interface";
import { findUser } from "../presentation/grpc/grpc.service";




export class AuthService implements IAuthService{
    //private userRepository: IUserRepository;

    constructor(){
        //this.userRepository = userRepository;
    }


    login = trycatchWrapper(async(email:string,password:string)=>{
        // write login function 
        // find user from grpc
        const resposne = await findUser(email)
        // check password in future hrere----------
        console.log("response from grpc",resposne);
        return resposne
    })


}