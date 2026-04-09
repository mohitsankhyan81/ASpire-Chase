import {Request,Response} from "express"
import pool from "../db/db"

export const createtask=async(req:Request,res:Response)=>{
    try{
        const {title,description,task_time}=req.body;

        const user=(req as any).user;

        const result=await pool.query(
            "insert into tasks (title,description,task_time,user_id) values ($1,$2,$3,$4) returning *",
            [title,description,task_time,user.id]
        )

        console.log(result.rows[0]);
        return res.status(200).json({messsage:"tasks create successfully",result:result.rows[0]});
    }
    catch(error){
        if(error instanceof Error){
            console.log("error in the creating task ",error.message)
            return res.status(500).json({message:error.message})
        }
    }
}


export const gettasks=async(req:Request,res:Response)=>{
    try{
         const user=(req as any).user;

         const response=await pool.query(
            "select * from tasks where user_id=$1",
            [user.id]
         )
        return res.status(200).json({
            success: true,
            tasks: response.rows
        });
    }
    catch(error){
        if(error instanceof Error){
            console.log("Error in the gettasks ", error.message);
            return res.status(500).json({message:error.message})
        }
    }
    
}