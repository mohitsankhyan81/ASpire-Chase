import {Request,Response} from "express"
import pool from "../db/db"

export const createtask=async(req:Request,res:Response)=>{
    try{
        const {title,description,task_time,priority,status}=req.body;
        const priorityValidate=["low","medium","high"];
        if(!priorityValidate || !priorityValidate.includes(priority)){
            return res.status(400).json({success:false,message:"invalid priority"});
        }
        const user=(req as any).user;
        
        const statusvalidator=["not-started","completed","in-process"];
        if(!statusvalidator || !statusvalidator.includes(status)){
            return res.status(400).json({success:false,message:"Invalid status"});
        }

        const result=await pool.query(
            "insert into tasks (title,description,task_time,status,user_id) values ($1,$2,$3,$4,$5) returning *",
            [title,description,task_time,status || "not-started",user.id]
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

export const getsingletask=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const user=(req as any).user;

        const responce=await pool.query(
            "select * from tasks where id=$1 and user_id=$2",
            [id,user.id]
        )

        if(responce.rows.length===0){
            return res.status(400).json({message:"No Task"});
        }

        return res.status(200).json({success:true,data:responce.rows[0]})
    }
    catch(error){
        if(error instanceof Error){
            console.log("error in the get single blog");
            return res.status(500).json({message:error.message});
        }
    }
}

export const updatetask=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const {title,description,task_time,priority,status}=req.body;
        const user=(req as any).user;

        const data=await pool.query(
            "select * from tasks where id=$1 and user_id=$2",
            [id,user.id]
        )
        if(data.rows.length===0){
            return res.status(400).json({success:false,message:"task not found"});
        }

        const update=await pool.query(
            `update tasks
            set title=$1,description=$2,task_time=$3,priority=$4,status=$5
            where id=$6 and user_id=$7
            returning *`,
            [title,description,task_time,priority,status,id,user.id]
        )

        return res.status(200).json({success:true,message:"task update successfully",update:update})

    }
    catch(error){
        if(error instanceof Error){
            console.log("Error in the updatetask");
            return res.status(500).json({success:false,error:error.message})
        }
    }
}

export const deletetask=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const user=(req as any).user;
        const deletedata=await pool.query(
            "delete from tasks where id=$1 and user_id=$2 returning *",
            [id,user.id]
        )

        if(deletedata.rows.length===0){
            return res.status(400).json({success:false,message:"task not found"})
        }
        return res.status(200).json({success:true,message:"task delete successfully" ,deleted:deletedata.rows[0]})
    }
    catch(error){
        if(error instanceof Error){
            console.log("error in the deletetask ",error.message);
            return res.status(500).json({success:false, error:error.message});
        }
    }
}

export const getcount=async(req:Request,res:Response)=>{
    try{
        const user=(req as any).user;

        const priority=await pool.query(
            `
                select 
                count(*) filter (where priority='high') as high,
                count(*) filter (where priority='medium') as medium,
                count(*) filter (where priority='low') as low
                from tasks
                where user_id=$1
            `,
            [user.id]
        )

        const status = await pool.query(
            `
            select 
            count(*) filter (where status='complete') as completed,
            count(*) filter (where status='not-started') as not_started,
            count(*) filter (where status='in-process') as in_process
            from tasks
            where user_id=$1
            `,
            [user.id]
        );

        return res.status(200).json({success:true,status:status.rows[0],priority:priority.rows[0]})
    }
    catch(error){
        if(error instanceof Error){
            console.log("Error in the getcount ",error.message)
            return res.status(400).json({success:false,error:error.message});
        }
    }
}

export const gettaskbystatus=async(req:Request,res:Response)=>{
    try{
        const {status}=req.query;
        const user=(req as any).user;

        const data=await pool.query(
         `select * from tasks where user_id=$1 and status=$2`,
         [user.id,status]
        )
        return res.status(200).json({data:data.rows[0]})
    }
    catch(error){
        if(error instanceof Error){
            console.log("Error into the status ",error.message);
            return res.status(500).json({success:false,error:error.message})
        }
    }
}

export const gettaskbypriority=async(req:Request,res:Response)=>{
    try{
        const {priority}=req.query
        const user=(req as any).user;

        const data=await pool.query(
            "select * from tasks where user_id=$1 and priority=$2",
            [user.id,priority]
        )

        return res.status(200).json({success:true,data:data.rows});
    }
    catch(error){
        if(error instanceof Error){
            console.log("error in the priority ",error.message)
            return res.status(500).json({success:false,error:error.message})
        }
    }
}