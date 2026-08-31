import {prisma} from '../config/db.js';

const getMovies = async (req, res) => {
    try {
        const movies = await prisma.movie.findMany();

        res.status(200).json({
            success: true,
            movies
        });
    } catch (error) {
        console.log("Failed to get movies", error);
        res.status(500).json({
            success: false,
            message: "Failed to get movies"
        });
    }
}

export {getMovies}