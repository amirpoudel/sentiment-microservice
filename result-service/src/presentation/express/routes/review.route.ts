
import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import { ReviewService } from "../../../services/review.service";
import { ReviewRepository } from "../../../infrastructure/data-access/repositories/review.repository";
import { CacheEnabledStrategy } from "../../../infrastructure/data-access/cache/strategy.cache";

const cacheStrategy = new CacheEnabledStrategy()
const reviewRepository = new ReviewRepository(cacheStrategy);
const reviewService = new ReviewService(reviewRepository);
const reviewController = new ReviewController(reviewService);

const router = Router();

router.get('/', reviewController.getReviews);

export default router;