import { Router } from "express";

import { ProcessReviewController } from "../controllers/process.controller";
import { ProcessReviewService } from "../../../services/review.service";
import { upload } from "../middlewares/upload-file.middleware";

const router = Router();
const reviewService = new ProcessReviewService();
const controller = new ProcessReviewController(reviewService);

router.route("/").post(controller.insertReview);

router.route("/bulk").post(controller.insertBulkReview);

router.route("/upload-file").post(upload.single('csv'),controller.uploadFile)

export default router