
import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import { ReviewService } from "../../../services/review.service";
import { ReviewRepository } from "../../../infrastructure/data-access/repositories/review.repository";

const reviewRepository = new ReviewRepository();
const reviewService = new ReviewService(reviewRepository);
const reviewController = new ReviewController(reviewService);

const router = Router();

router.get('/', reviewController.getReviews);

export default router;