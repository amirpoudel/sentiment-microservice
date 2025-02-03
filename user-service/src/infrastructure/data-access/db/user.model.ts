import {Document , Schema , model } from "mongoose"
import { User } from "../../../entities/user.entity"


export type IUserDocument = User & Document

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String
    },
    address:{
        type:String
    }
},{
    timestamps:true
})

// index 
userSchema.index({email:1})



const UserModel = model('User',userSchema)

export {UserModel}