import express from "express"
import { signup } from "../controller/user_controller"
import {login } from "../controller/user_controller"; 
import {logout} from "../controller/user_controller";
import {authentication} from"../middleware/auth";

const userrouter = express.Router()

userrouter.post("/signup", signup)
userrouter.post("/login",login);
userrouter.get('/logout',authentication,logout);

export default userrouter