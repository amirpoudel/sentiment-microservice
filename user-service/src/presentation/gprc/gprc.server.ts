import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from '@grpc/proto-loader';
import { UserRepository } from "../../infrastructure/data-access/repositories/user.repository";
import { UserService } from "../../services/user.service";



// Load the proto file
const PROTO_PATH = path.join(__dirname,'./.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userServiceProto = grpc.loadPackageDefinition(packageDefinition).user as any;

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
// Define the gRPC method implementation
async function getUserByEmail(call:any, callback:any) {
  const email = call.request.email as string;
  if (!email) {
    return callback({
      message: "Email is required",
      code: grpc.status.INVALID_ARGUMENT,
    });
  }
  const user = await userService.getUserByEmail(email) 
  if (!user) {
    return callback({
      message: "User not found",
      code: grpc.status.NOT_FOUND,
    });
  }
  callback(null, user);
}

// Create the gRPC server
const server = new grpc.Server();

if (userServiceProto) {
  server.addService(userServiceProto.UserService?.service, {
    getUserByEmail,
  });
} else {
  console.error("userServiceProto is undefined");
}

const PORT = 40001;
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`gRPC Server is running on port ${PORT}`);
  server.start();
});
