import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../../../services/user.service";
import { UserRepository } from "../../../infrastructure/data-access/repositories/user.repository";


const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

const router = Router()


router.route("/").post(userController.createUser)


export default router;