import { User } from "../entities/user.entity";
import { IUserRepository, IUserService } from "../interface/user.interface";
import { trycatchWrapper } from "../lib/async/trycatch.async";



export class UserService implements IUserService{
    private userRepository: IUserRepository;

    constructor(userRepository:IUserRepository){
        this.userRepository = userRepository;
    }


    createUser = trycatchWrapper(async(user:User)=>{
        return this.userRepository.createUser(user)
    })

    getUserByEmail = trycatchWrapper(async(email:string)=>{
        return this.getUserByEmail(email)
    })


}