import { AppError } from "backend-error-handler";
import { userStub } from "./grpc.server";
import { UserGRPCResponse } from "../../entities/auth.entity";


export async function findUser(email:string):Promise<UserGRPCResponse | null>{
   // userStub.getUserByEmail({email:email})
   return new Promise((resolve,reject)=>{
    userStub.getUserByEmail({email:email},(err:any,user:any)=>{
        if(err){
            return resolve(null)
        }
        console.log('User Found')
        console.log(user)
        return resolve(user)
    })
   })
}