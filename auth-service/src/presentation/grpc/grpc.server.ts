import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const PROTO_PATH = path.join(__dirname, './user.proto');

// Load the `.proto` file and create the package definition
const packageDefinitionUser = protoLoader.loadSync(PROTO_PATH);

// Load the gRPC package and access the UserService via the `user` namespace
const userProto = grpc.loadPackageDefinition(packageDefinitionUser) as any;
const UserService = userProto.user.UserService;

// Create a stub for the `UserService`
export const userStub = new UserService(
    '0.0.0.0:40001', 
    grpc.credentials.createInsecure()
);

// Example usage (uncomment to test)
/*
userStub.getUserByEmail({ email: "amirpoudel2058@gmail.com" }, (err, response) => {
    if (err) {
        console.error("Error finding user:", err);
    } else {
        console.log("User Found:", response);
    }
});
*/
