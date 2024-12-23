import { Router } from "express";
import { UploadFileController } from "../controllers/upload-file.controller";
import { upload } from "../middlewares/upload-file.middleware";

const router = Router();
const controller = new UploadFileController();



router.route("/").post(upload.single('csv'),controller.upload)










export default router