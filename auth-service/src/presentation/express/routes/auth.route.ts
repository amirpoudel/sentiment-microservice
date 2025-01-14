import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../../../services/auth.service";
const service = new AuthService();
const controller = new AuthController(service)
const router = Router()

router.post("/login",controller.login)
router.post("/verify-access-token",controller.verifyAccessToken)


export default router