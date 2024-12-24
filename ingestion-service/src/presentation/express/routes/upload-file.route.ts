import { Router } from "express";
import { UploadFileController } from "../controllers/upload-file.controller";
import { upload } from "../middlewares/upload-file.middleware";
import FileProcessingService from "../../../services/fileProcessing.service";

const router = Router();
const fileProcessingService = new FileProcessingService();
const controller = new UploadFileController(fileProcessingService);



router.route("/").post(upload.single('csv'),controller.upload)










export default router