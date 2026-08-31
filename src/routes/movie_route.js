import express from "express";
import { getMovies } from "../controllers/movie_controller.js";


const router = express.Router();

router.get("/get-movies", getMovies);

export default router;