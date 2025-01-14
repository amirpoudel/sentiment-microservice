import { Router } from "express";

import { ProcessReviewController } from "../controllers/process.controller";
import { ProcessReviewService } from "../../../services/review.service";
import { upload } from "../middlewares/upload-file.middleware";
import { ProcessReviewRepository } from "../../../infrastructure/data-access/repositories/process.repository";

const router = Router();
const processReviewRepository = new ProcessReviewRepository()
const reviewService = new ProcessReviewService(processReviewRepository);
const controller = new ProcessReviewController(reviewService);

router.route("/").post(controller.insertReview);

router.route("/bulk").post(controller.insertBulkReview);

router.route("/upload-file").post(upload.single('csv'),controller.uploadFile)

router.route("/")

export default router