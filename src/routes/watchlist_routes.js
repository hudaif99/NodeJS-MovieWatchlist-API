import express from 'express';
import { addToWatchlist, removeFromWatchlist, updateWatchlistItem } from '../controllers/watchlist_controller.js';
import { authMiddleware } from "../middleware/auth_middleware.js";
import { validateRequest } from '../middleware/validate_request.js';
import { addToWatchlistSchema } from '../validators/watchlist_validator.js';

const router = express.Router();

router.use(authMiddleware);

router.post("/add-to-watchlist",validateRequest(addToWatchlistSchema),  addToWatchlist);

router.put("/update-watchlist/:id", updateWatchlistItem);

router.delete("/remove-watchlist/:id", removeFromWatchlist);

export default router;