import {Request, Response,NextFunction} from "express"
import jwt from "jsonwebtoken"
import pool from "../db/db"
export const authentication=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const authorization=req.headers.authorization;

        if(!authorization|| !authorization.startsWith("Bearer ")){
            return res.status(400).json({message:"access token is missing or invalid"});
        }

        const token=authorization.split(" ")[1];
        console.log(token);

        const decode=await jwt.verify(token,process.env.SECRET_KEY);

        const user=await pool.query(
            "select * from usersdata where id=$1",
            [decode.userid]
        )

        if(user.rows[0].length==0){
            return res.status(400).json({message:"user not found"});
        }
        (req as any).user=user.rows[0];
        console.log((req as any).user);
        next();
    }
    catch(error){
        if(error instanceof Error){
            console.log("error in the authenting ", error);
            return res.status(500).json({message:error.message})
        }
    }
}