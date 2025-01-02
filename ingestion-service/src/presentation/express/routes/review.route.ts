import { Router } from "express";

import { ReviewController } from "../controllers/review.controller";
import { ReviewService } from "../../../services/review.service";

const router = Router();
const reviewService = new ReviewService();
const controller = new ReviewController(reviewService);

router.route("/").post(controller.insertReview);
router.route("/bulk").post(controller.insertBulkReview);


export default router