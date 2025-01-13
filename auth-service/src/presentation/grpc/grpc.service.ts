import { userStub } from "./grpc.server";


export async function findUser(email:string){
   // userStub.getUserByEmail({email:email})
    await userStub.getUserByEmail({email:email},(err:any,user:any)=>{
        console.log('User Found')
        console.log(user)
        return user
    })
    
    
}