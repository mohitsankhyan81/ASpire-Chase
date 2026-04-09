import express from "express";
import {authentication} from "../middleware/auth";
import {createtask} from "../controller/task_controller";
import {gettasks} from "../controller/task_controller";
 
const taskroute =express.Router();

taskroute.post("/createtask",authentication,createtask)
taskroute.get("/gettask",authentication,gettasks);
export default taskroute