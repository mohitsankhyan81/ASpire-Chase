import express from "express";
import {authentication} from "../middleware/auth";
import {createtask} from "../controller/task_controller";
import {gettasks} from "../controller/task_controller";
import {getsingletask} from "../controller/task_controller";
import {updatetask} from "../controller/task_controller";
import {deletetask} from "../controller/task_controller";
import {getcount} from "../controller/task_controller";
import {gettaskbystatus} from "../controller/task_controller";
 
const taskroute =express.Router();

taskroute.post("/createtask",authentication,createtask)
taskroute.get("/gettask",authentication,gettasks);
taskroute.get("/getsingletask/:id",authentication,getsingletask);
taskroute.put("/updatetask/:id",authentication,updatetask);
taskroute.delete("/deletetask/:id",authentication,deletetask);
taskroute.get("/getcount",authentication,getcount);
taskroute.get("/tasks/filter",authentication,gettaskbystatus);
export default taskroute