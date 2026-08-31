import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generate_token.js";


const register = async (req, res) => {
    const {email, password, name} = req.body;
    // res.json({message: `You are authorized ${userName}, email: ${email}`});

    const userExist = await prisma.user.findUnique({where: {email: email}});
    //  const userExist = await prisma.user.findUnique

    if(userExist){
        return res.status(400).json({error: "User already exist with this email."});
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user in db
    const user = await prisma.user.create({data:{
        name, email,password: hashedPassword
    }});


    const token = generateToken(user.id, res);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id, 
                name: name, 
                email: email,
            },
            token
        }
    })
};

const login = async (req, res) => {
    const {email, password} = req.body;

     const user = await prisma.user.findUnique({where: {email: email}});

     if(!user){
        res.status(401).json({message: "Invalid email or password"});
     }

     const isPasswordValid = await bcrypt.compare(password, user.password);

     if(!isPasswordValid){
           res.status(401).json({message: "Invalid email or password"});
     }

       const token = generateToken(user.id, res);

      res.status(200).json({
       status: "success",
       data: {
          user: {
                id: user.id, 
                email: email,
            },
            token,
        }
    })
}

const logout = async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        rexpires: new Date(0)
    });
    res.status(200).json({
        success: "true",
        message: "Logged out successfully"
    });
}

export {register, login, logout}