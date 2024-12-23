import { Router } from "express";
import { UploadFileController } from "../controllers/upload-file.controller";


const router = Router();
const controller = new UploadFileController();


router.route("/").post(controller.stream)










export default router