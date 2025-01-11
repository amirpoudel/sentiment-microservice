import { User, UserCreateInput } from "../entities/user.entity";
import { IUserRepository, IUserService } from "../interface/user.interface";
import { trycatchWrapper } from "../lib/async/trycatch.async";



export class UserService implements IUserService{
    private userRepository: IUserRepository;

    constructor(userRepository:IUserRepository){
        this.userRepository = userRepository;
    }


    createUser = trycatchWrapper(async(user:UserCreateInput)=>{
        console.log("User Service")
        console.log(user)
        return await this.userRepository.createUser(user)
    })

    getUserByEmail = trycatchWrapper(async(email:string)=>{
        return await this.getUserByEmail(email)
    })


}