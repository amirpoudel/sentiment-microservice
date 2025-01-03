import { User, UserCreateInput } from "../entities/user.entity";


export interface IUserRepository{

    createUser(input:UserCreateInput):Promise<User>

    getUserByEmail(email:string):Promise<User>
}


export interface IUserService{
    createUser(input:UserCreateInput):Promise<User>

    getUserByEmail(email:string):Promise<User>
}
