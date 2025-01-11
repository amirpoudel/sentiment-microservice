import { UserRepository } from "../../infrastructure/data-access/repositories/user.repository";
import { UserService } from "../../services/user.service";

const userRepository = new UserRepository()
const userService  = new UserService(userRepository);

function getUserByEmail(call:any , callback:any){
    const email = call.request.email;
    if(!email){
        return callback({
            message:"Email is required",
            code: 
        })
    }
}