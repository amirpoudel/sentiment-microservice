import { User, UserCreateInput } from "../../../entities/user.entity"
import { IUserRepository } from "../../../interface/user.interface";
import { trycatchWrapperMongo } from "../../../lib/async/trycatch.async"
import {  UserModel } from "../db/user.model"


export  class UserRepository implements IUserRepository{


    createUser = trycatchWrapperMongo(async(user:UserCreateInput):Promise<any|null>=>{
        return await UserModel.create(user);
    })

    getUserByEmail = trycatchWrapperMongo(async (email:string):Promise<any | null>=>{
        
        return await UserModel.findOne({email: { $regex: new RegExp(`^${email}$`, "i") }}).lean(); // case insensitive search
    })

}