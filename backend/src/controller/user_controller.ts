import { Request, Response } from "express"
import pool from "../db/db"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

interface Signin {
    name: string
    email: string
    password: string
}

export const signup = async (
    req: Request<{}, {}, Signin>,
    res: Response
) => {
    const { name, email, password } = req.body

    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const existingUser = await pool.query(
            "SELECT * FROM usersdata WHERE email=$1",
            [email]
        )

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const hashpassword=await bcrypt.hash(password,10);

        const result = await pool.query(
            "INSERT INTO usersdata (name,email,password) VALUES ($1,$2,$3) RETURNING *",
            [name, email, hashpassword]
        )

        const token = jwt.sign(
            { userid: result.rows[0].id },
            process.env.SECRET_KEY as string,
            { expiresIn: "45d" }
        )

        await pool.query(
            "UPDATE usersdata SET token=$1 WHERE id=$2",
            [token, result.rows[0].id]
        )

        return res.status(201).json({
            success: true,
            user: {
                id: result.rows[0].id,
                name: result.rows[0].name,
                email: result.rows[0].email,
                password:result.rows[0].password,
                islogin:result.rows[0].islogin
            },
            token
        })

    } catch (error) {
        if (error instanceof Error) {
            console.log("Error in signup:", error.message)
            return res.status(500).json({ message: error.message })
        }
    }
}

interface loginuser{
    email:string,
    password:string
}

export const login=async(req:Request<{},{},loginuser>,res:Response)=>{
    try{
        const {email,password}=req.body;

        if(!email||!password){
            return res.status(400).json({message:"all fields are required"});
        }

        const user=await pool.query(
            "select * from usersdata where email=$1",
            [email]
        )

        if(user.rows.length===0){
            return res.status(400).json({message:"user not signup"})
        }
        
        const dbuser=user.rows[0].password;
        const ismatch=await bcrypt.compare(password,dbuser)
        if(!ismatch){
            return res.status(400).json({message:"wrong password"});
        }
        const token = jwt.sign(
            { userid: user.rows[0].id },
            process.env.SECRET_KEY as string,
            { expiresIn: "45d" }
        )
        console.log(ismatch)
        await pool.query(
            "update usersdata set islogin=true where email=$1",
            [email]
        )

        return res.status(200).json({message:"user login successfully",user:user.rows[0],token:token});
    }
    catch(error){
        if(error instanceof Error){
        console.log("error in the login ",login)
        return res.status(500).json({message:error.message})
        }
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        await pool.query(
            "UPDATE usersdata SET islogin=false WHERE email=$1",
            [email]
        );

        return res.status(200).json({ message: "logout successfully" });
    } catch (error) {
        if (error instanceof Error) {
            console.log("error in logout", error.message);
            return res.status(500).json({ message: error.message });
        }
    }
}