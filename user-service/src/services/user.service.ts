import { User, UserCreateInput } from "../entities/user.entity";
import { IUserRepository, IUserService } from "../interface/user.interface";
import { trycatchWrapper } from "../lib/async/trycatch.async";
import { hashPassword } from "../lib/auth/bcrypt";
import { AppError } from "../lib/error/app.error";



export class UserService implements IUserService{
    private userRepository: IUserRepository;

    constructor(userRepository:IUserRepository){
        this.userRepository = userRepository;
    }


    createUser = trycatchWrapper(async(user:UserCreateInput)=>{
        //check user is present or not 
        const existingUser = await this.userRepository.getUserByEmail(user.email);
        if(existingUser){
            throw AppError.conflict("User already exists")
        }
        user.password = await hashPassword(user.password);
        return await this.userRepository.createUser(user)
    })

    getUserByEmail = trycatchWrapper(async(email:string)=>{
        return await this.userRepository.getUserByEmail(email)
    })


}