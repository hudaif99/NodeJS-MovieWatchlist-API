import jwt from "jsonwebtoken";
import {prisma} from "../config/db.js";

export const authMiddleware = async (req, res, next) => {
    console.log("authMiddleware called");

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];   
    } else if(req.cookies?.jwt){
        token = req.cookies.jwt;
    } else {
        return res.status(401).json({error: "You are not authorized to do this operation."});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({where: {id: decoded.id}});

        if(!user){
            return res.status(401).json({error: "User no longer exist"});
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({error: `Not authorized. ${error}`});
    }
}